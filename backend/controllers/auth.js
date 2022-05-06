import asyncHandler from 'express-async-handler'
import UserModel from '../models/usersModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import cookie from 'cookie'
import crypto from 'crypto'
import { sendEmail } from '../utils/sendEmail.js'
import { imageSingleUpload } from '../hooks/uploaderHooks.js'
import axios from 'axios'

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
    role,
  })

  sendTokenResponse(res, 200, user)
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  //Validate email & pwd
  if (!email || !password) return next(new ErrorResponse(`Please provide an email and password`, 400))

  //Find user
  const user = await UserModel.findOne({ email }).select('+password')
  if (!user) return next(new ErrorResponse(`Invalid credentials`, 401))

  //Check if password matches
  const isMatch = await user.matchPassword(password)
  if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401))

  //Check Premium Subscription
  if (user.subscription_id) {
    const accessToken = await getPayPalAccessToken()
    const subscription = await getPayPalSubscriptionDetails(accessToken, user.subscription_id)

    if (!subscription) {
      user.subscription_id = undefined
      user.subscription_status = 'INACTIVE'
      await user.save()
    }

    user.subscription_status = subscription.status
    await user.save()
    return sendTokenResponse(res, 200, user, subscription)
  }

  //Create token
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

// @desc      Upload Avatar
// @route     POST /api/v1/auth/upload
// @access    Private
export const uploadAvatar = asyncHandler(async (req, res, next) => {
  const { data } = req.body

  const user = await UserModel.findById(req.user.id)
  if (!user) return new ErrorResponse(`User with id: ${id} not found`, 404)

  const newImage = await imageSingleUpload(data)
  user.avatar = newImage

  await user.save()

  res.json({ success: true, data: user })
})

// @desc      Add Premium
// @route     POST /api/v1/auth/premium
// @access    private
export const addPremium = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)
  if (!user) return new ErrorResponse(`User with id: ${id} not found`, 404)

  if (user.subscription_id) return new ErrorResponse(`User already has a subscription`, 400)
  user.subscription_status = req.body.status
  user.subscription_id = req.body.subscription_id
  user.save()

  return sendTokenResponse(res, 200, user, { id: req.body.subscription_id, status: req.body.status })
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

  if (subscription) {
    const subscriptionToken = user.getSignedJwtTokenSubscription(subscription)
    return res
      .status(statusCode)
      .setHeader('Set-Cookie', [cookie.serialize('token', token, options), cookie.serialize('sub_token', subscriptionToken, options)])
      .json({ success: true })
  }

  res.status(statusCode).setHeader('Set-Cookie', cookie.serialize('token', token, options)).json({ success: true })
}

//Paypal Access Token
const getPayPalAccessToken = async () => {
  const url = 'https://api.sandbox.paypal.com/v1/oauth2/token'
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
  }

  try {
    const response = await axios.post(url, params, config)
    return response.data.access_token
  } catch (error) {
    return console.error(error)
  }
}

//Paypal Subscription Details
const getPayPalSubscriptionDetails = async (accessToken, subscriptionId) => {
  const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}`
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    const { data } = await axios.get(url, config)
    return data
  } catch (error) {
    console.error(error)
    return {}
  }
}
