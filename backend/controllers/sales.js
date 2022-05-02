import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from 'express-async-handler'
import RentalModel from '../models/rentalsModel.js'
import SaleModel from '../models/salesModel.js'
import ProfileModel from '../models/profilesModel.js'

// @desc      Get all sales
// @route     GET /api/v1/sales
// @access    Public
export const getSales = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single sale
// @route     GET /api/v1/sales/:id
// @access    Public
export const getSale = asyncHandler(async (req, res, next) => {
  let sale = await SaleModel.findById(req.params.id).populate([
    { path: 'publisher', select: 'name avatar' },
    { path: 'publisher_profile', select: '-observed' },
    'property',
  ])

  if (!sale) {
    sale = await SaleModel.findOne({ property: req.params.id }).populate([
      { path: 'publisher', select: 'name avatar' },
      { path: 'publisher_profile', select: '-observed' },
      'property',
    ])

    if (!sale) return next(new ErrorResponse('Sale details not found', 404))
  }
  res.status(200).json({ success: true, data: sale })
})

// @desc      Create sale
// @route     POST /api/v1/sales
// @access    Private
export const createSale = asyncHandler(async (req, res, next) => {
  req.body.publisher = req.user.id

  const rental = await RentalModel.findOne({ property: req.body.property })
  if (rental) return next(new ErrorResponse(`Property with id of ${req.body.property} is already listed for rent`, 400))

  const sale = await SaleModel.create(req.body)

  const profile = await ProfileModel.findOne({ user: req.user.id })
  profile.sales.push(sale._id)
  await profile.save({ validateBeforeSave: false })

  res.status(201).json({ success: true, data: sale })
})

// @desc      Update sale
// @route     PUT /api/v1/sales/:id
// @access    Private
export const updateSale = asyncHandler(async (req, res, next) => {
  let sale = await SaleModel.findById(req.params.id)
  if (!sale) return next(new ErrorResponse(`Sale with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches publisher
  if (sale.publisher.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to update this property`, 401))
  }

  sale = await SaleModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    timestamps: true,
  })

  res.status(200).json({ success: true, data: sale })
})

// @desc      Delete rental
// @route     DELETE /api/v1/rentals/:id
// @access    Private
export const deleteSale = asyncHandler(async (req, res, next) => {
  let sale = await SaleModel.findById(req.params.id)
  if (!sale) return next(new ErrorResponse(`Sale with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches publisher
  if (sale.publisher.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to delete this property`, 401))
  }

  const profile = await ProfileModel.findOne({ user: req.user.id })
  profile.sales.filter((sale) => sale.toString() !== req.params.id)
  await profile.save({ validateBeforeSave: false })

  sale.remove()
  res.status(200).json({ success: true, data: {} })
})
