import asyncHandler from 'express-async-handler'
import UserModel from '../models/usersModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import cookie from 'cookie'
import crypto from 'crypto'
import { sendEmail } from '../utils/sendEmail.js'
import { getPayPalSubscriptionDetails } from '../utils/paypal.js'

// @desc      Check if user is already authorized
// @route     GET /api/v1/auth/check
// @access    Private
export const checkAuth = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true })
})

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body
  const user = await UserModel.create({
    name,
    email,
    password,
  })

  sendTokenResponse(res, 200, user)
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new ErrorResponse(`Please provide an email and password`, 400))

  const user = await UserModel.findOne({ email }).select('+password')
  if (!user) return next(new ErrorResponse(`Invalid credentials`, 401))

  const isMatch = await user.matchPassword(password)
  if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401))

  // Check subscription status
  if (user.is_premium.active) {
    const subscription = await getPayPalSubscriptionDetails(user.subscription.subscription_id)

    if (subscription.status === 'ACTIVE') {
      user.is_premium = {
        active: true,
        expires: req.body.billing_info.next_billing_time,
      }

      user.subscription = {
        status: req.body.status,
        paid_until: req.body.billing_info.next_billing_time,
      }

      await user.save()
    }

    if (subscription.status === 'SUSPENDED') {
      user.subscription.status = req.body.status
      await user.save()
    }

    if (subscription.status === 'CANCELLED') {
      if (Date.now() > user.is_premium.expires) {
        user.is_premium = {
          active: false,
          expires: undefined,
        }
        user.subscription = {
          status: 'INACTIVE',
          paid_until: undefined,
          id: undefined,
          plan_id: undefined,
        }

        await user.save()
      }

      user.subscription = {
        status: req.body.status,
        paid_until: undefined,
      }

      await user.save()
    }
  }

  sendTokenResponse(res, 200, user)
})

// @desc      Get currently logged in user
// @route     GET /api/v1/auth/me
// @access    Private
export const getMe = asyncHandler(async (req, res, next) => {
  let user = await UserModel.findById(req.user.id)
  res.status(200).json({ success: true, data: user })
})

// @desc      Logout user / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 10,
    sameSite: 'strict',
    path: '/',
  }

  res
    .status(200)
    .setHeader('Set-Cookie', [cookie.serialize('token', '', options), cookie.serialize('sub_token', '', options)])
    .json({ success: true })
})

// @desc      Forgot password
// @route     POST /api/v1/auth/recover
// @access    Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email }).select('email')

  if (!user) return next(new ErrorResponse(`Email incorrect`, 404))

  // Get reset token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetUrl =
    process.env.NODE_ENV === 'production'
      ? `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`
      : `${req.protocol}://localhost:3000/reset-password/${resetToken}`

  const message = `You received this email because you (or someone else) has requested the reset of your password. If it wasn't you please ignore this message, otherwise please click on the link below: \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset request',
      message,
      resetUrl,
    })

    res.status(200).json({ success: true, data: 'Email has been sent, please check your inbox' })
  } catch (error) {
    console.error(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new Error('Password reset request unsuccessful', 500))
  }
})

// @desc      Reset Password
// @route     PUT /api/v1/auth/recover/:resettoken
// @access    Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) return next(new ErrorResponse(`Invalid token`, 400))

  //Set new Password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save({ validateBeforeSave: false })

  sendTokenResponse(res, 200, user)
})

//Helper function
function sendTokenResponse(res, statusCode, user, subscription = null) {
  const token = user.getSignedJwtToken()

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: process.env.NODE_ENV === 'development' ? 60 * 60 * 24 * 30 : process.env.TOKEN_COOKIE_EXPIRE,
    sameSite: 'strict',
    path: '/',
  }

  res.status(statusCode).setHeader('Set-Cookie', cookie.serialize('token', token, options)).json({ success: true, data: user })
}
