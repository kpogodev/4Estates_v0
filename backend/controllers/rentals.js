import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from 'express-async-handler'
import RentalModel from '../models/rentalsModel.js'
import SaleModel from '../models/salesModel.js'
import ProfileModel from '../models/profilesModel.js'

// @desc      Get all rentals
// @route     GET /api/v1/rentals
// @access    Public
export const getRentals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single rental
// @route     GET /api/v1/rentals/:id
// @access    Public
export const getRental = asyncHandler(async (req, res, next) => {
  const rental = await RentalModel.findById(req.params.id).populate([
    { path: 'publisher', select: 'name avatar' },
    { path: 'publisher_profile', select: '-observed' },
    'property',
  ])
  if (!rental) return next(new ErrorResponse('Rental details not found', 404))
  res.status(200).json({ success: true, data: rental })
})

// @desc      Create rental
// @route     POST /api/v1/rentals
// @access    Private
export const createRental = asyncHandler(async (req, res, next) => {
  req.body.publisher = req.user.id

  const sale = await SaleModel.findOne({ property: req.body.property })
  if (sale) return next(new ErrorResponse(`Property with id of ${req.body.property} is already listed for sale`, 400))

  const rental = await RentalModel.create(req.body)

  const profile = await ProfileModel.findOne({ user: req.user.id })
  profile.rents.push(rental._id)
  await profile.save({ validateBeforeSave: false })

  res.status(201).json({ success: true, data: rental })
})

// @desc      Update rental
// @route     PUT /api/v1/rentals/:id
// @access    Private
export const updateRental = asyncHandler(async (req, res, next) => {
  let rental = await RentalModel.findById(req.params.id)
  if (!rental) return next(new ErrorResponse(`Rental with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches publisher
  if (rental.publisher.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to update this property`, 401))
  }

  rental = await RentalModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    timestamps: true,
  })

  res.status(200).json({ success: true, data: rental })
})

// @desc      Delete rental
// @route     DELETE /api/v1/rentals/:id
// @access    Private
export const deleteRental = asyncHandler(async (req, res, next) => {
  let rental = await RentalModel.findById(req.params.id)
  if (!rental) return next(new ErrorResponse(`Rental with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches publisher
  if (rental.publisher.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to delete this property`, 401))
  }

  rental.remove()
  res.status(200).json({ success: true, data: {} })
})
