import asyncHandler from 'express-async-handler'
import UserModel from '../models/usersModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import { imageSingleUpload } from '../hooks/uploaderHooks.js'
import { suspendPayPalSubscription, reactivatePayPalSubscription, cancelPayPalSubscription, getPayPalSubscriptionDetails } from '../utils/paypal.js'

// @desc      Upload Avatar
// @route     POST /api/v1/users/avatar
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
// @route     POST /api/v1/users/premium
// @access    private
export const addPremium = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)
  if (!user) return new ErrorResponse(`User with id: ${id} not found`, 404)

  if (user.subscription.id) return new ErrorResponse(`User already has a subscription`, 400)

  user.is_premium = {
    active: true,
    expires: req.body.billing_info.next_billing_time,
  }

  user.subscription = {
    id: req.body.id,
    status: req.body.status,
    paid_until: req.body.billing_info.next_billing_time,
    plan_id: req.body.plan_id,
  }

  await user.save()
  return res.status(200).json({ success: true, data: user, message: 'Congratulations, you have been upgraded to a premium member' })
})

// @desc      Update Premium
// @route     PUT /api/v1/users/premium
// @access    private
export const updatePremium = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)

  if (!user) return new ErrorResponse(`User with id: ${id} not found`, 404)
  if (!user.subscription.id) return new ErrorResponse(`User does not have a subscription`, 400)
  if (req.body.action !== 'suspend' && req.body.action !== 'reactivate') return new ErrorResponse(`Invalid action`, 400)

  switch (req.body.action) {
    case 'suspend':
      const resSuspend = await suspendPayPalSubscription(user.subscription.id)
      if (resSuspend.status !== 204) return new ErrorResponse(`Could not suspend subscription`, 400)
      user.subscription.status = 'SUSPENDED'
      await user.save()
      return res.status(200).json({ success: true, data: user, message: 'Your subscription has been suspended' })

    case 'reactivate':
      const resActivate = await reactivatePayPalSubscription(user.subscription.id)
      if (resActivate.status !== 204) return new ErrorResponse(`Could not reactivate subscription`, 400)
      const renewedSubscription = await getPayPalSubscriptionDetails(user.subscription.id)
      user.subscription.status = renewedSubscription.status
      user.subscription.paid_until = renewedSubscription.billing_info.next_billing_time
      await user.save()
      return res.status(200).json({ success: true, data: user, message: 'Your subscription has been reactivated' })
  }
})

export const deletePremium = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)

  if (!user) return new ErrorResponse(`User with id: ${id} not found`, 404)
  if (!user.subscription.id) return new ErrorResponse(`User does not have a subscription`, 400)

  const resCancel = await cancelPayPalSubscription(user.subscription.id)

  if (resCancel.status !== 204) return new ErrorResponse(`Could not cancel subscription`, 400)

  user.subscription = {
    ...user.subscription,
    paid_until: undefined,
    status: 'CANCELLED',
    plan_id: undefined,
  }
  await user.save()

  return res.status(200).json({ success: true, data: user, message: 'Your subscription has been cancelled' })
})
