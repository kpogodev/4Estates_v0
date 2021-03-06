import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from 'express-async-handler'
import ProfileModel from '../models/profilesModel.js'

// @desc      Get all profiles
// @route     GET /api/v1/profiles
// @access    Public
export const getProfiles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single profile
// @route     GET /api/v1/profiles/:id
// @access    Public
export const getProfile = asyncHandler(async (req, res, next) => {
  const profile = await ProfileModel.find(req.params.id).populate('user', ['name', 'avatar'])

  if (!profile) return next(new ErrorResponse('Profile not found', 404))

  res.status(200).json({ success: true, data: profile })
})

// @desc      Get user's profile
// @route     GET /api/v1/profiles/me
// @access    Private
export const getUserProfle = asyncHandler(async (req, res, next) => {
  const profile = await ProfileModel.findOne({ user: req.user.id })

  if (!profile) return next(new ErrorResponse('Profile not found', 404))

  res.status(200).json({ success: true, data: profile })
})

// @desc      Create Profile
// @route     POST /api/v1/profiles
// @access    Private
export const createProfile = asyncHandler(async (req, res, next) => {
  //Set user based on user making request
  req.body.user = req.user.id

  const profile = await ProfileModel.create(req.body)
  res.status(201).json({ success: true, data: profile })
})

// @desc      Update profile
// @route     PUT /api/v1/profiles/:id
// @access    Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const profile = await ProfileModel.findById(req.params.id)

  if (!profile) return next(new ErrorResponse(`Profile with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches user linked to a profile
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to update this profile`, 401))
  }

  const updatedProfile = await ProfileModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
    timestamps: true,
  })

  res.status(200).json({ success: true, data: updatedProfile })
})

// @desc      Delete profile
// @route     DELETE /api/v1/profiles/:id
// @access    Private
export const deleteProfile = asyncHandler(async (req, res, next) => {
  let profile = await ProfileModel.findById(req.params.id)

  if (!profile) return next(new ErrorResponse(`Profile with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches user link to a profile
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to delete this profile`, 401))
  }

  profile.remove()
  res.status(200).json({ success: true, data: {} })
})

// @desc      Add Observed Rental
// @route     PATCH /api/v1/profiles/observedrentals/add
// @access    Private
export const addObservedRental = asyncHandler(async (req, res, next) => {
  const profile = await ProfileModel.findOne({ user: req.user.id })

  if (!profile) return next(new ErrorResponse(`Profile not found.`, 404))

  //Verify if user making request matches user linked to a profile
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to add this rental to observed rentals`, 401))
  }

  profile.observed.rents.unshift(req.body.id)
  await profile.save()

  res.status(200).json({ success: true, data: profile })
})

// @desc      Remove Observed Rental
// @route     PATCH /api/v1/profiles/observedrentals/remove
// @access    Private
export const removeObservedRental = asyncHandler(async (req, res, next) => {
  let profile = await ProfileModel.findOne({ user: req.user.id })

  if (!profile) return next(new ErrorResponse(`Profile not found.`, 404))

  //Verify if user making request matches user linked to a profile
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to add this rental to observed rentals`, 401))
  }

  profile.observed.rents = profile.observed.rents.filter((rent) => rent.toString() !== req.body.id)
  await profile.save()

  res.status(200).json({ success: true, data: profile })
})
