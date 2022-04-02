import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from 'express-async-handler'
import PropertyModel from '../models/propertiesModel.js'
import { imageMultiUpload } from '../hooks/uploaderHooks.js'

// @desc      Get all properties
// @route     GET /api/v1/properties
// @access    Public
export const getProperties = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single property
// @route     GET /api/v1/properties/:id
// @access    Public
export const getProperty = asyncHandler(async (req, res, next) => {
  const property = await PropertyModel.findById(req.params.id)

  if (!property) return next(new ErrorResponse('Property not found', 404))

  res.status(200).json({ success: true, data: property })
})

// @desc      Create property
// @route     POST /api/v1/properties
// @access    Private
export const createProperty = asyncHandler(async (req, res, next) => {
  //Set publisher based on user making request
  req.body.publisher = req.user.id

  const property = await PropertyModel.create(req.body)
  res.status(201).json({ success: true, data: property })
})

// @desc      Update property
// @route     PUT /api/v1/properties/:id
// @access    Private
export const updateProperty = asyncHandler(async (req, res, next) => {
  let property = await PropertyModel.findById(req.params.id)

  if (!property) return next(new ErrorResponse(`Property with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches publisher
  if (property.publisher.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to update this property`, 401))
  }

  property = await PropertyModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
    timestamps: true,
  })

  res.status(200).json({ success: true, data: property })
})

// @desc      Delete property
// @route     DELETE /api/v1/properties/:id
// @access    Private
export const deleteProperty = asyncHandler(async (req, res, next) => {
  let property = await PropertyModel.findById(req.params.id)

  if (!property) return next(new ErrorResponse(`Property with id of ${req.params.id} not found.`, 404))

  //Verify if user making request matches publisher
  if (property.publisher.toString() !== req.user.id) {
    return next(new ErrorResponse(`User with id ${req.user.id} is not authorized to delete this property`, 401))
  }

  property.remove()
  res.status(200).json({ success: true, data: {} })
})

// @desc      Uplaod images
// @route     POST /api/v1/properties/upload
// @access    Private
export const uploadPropertyImages = asyncHandler(async (req, res, next) => {
  const { data, id } = req.body

  const property = await PropertyModel.findById(id)
  if (!property) return new ErrorResponse(`Property with id: ${id} not found`, 404)

  const newImages = await imageMultiUpload(data)
  property.images = [...property.images, ...newImages]

  await property.save()

  res.json({ success: true, data: property })
})
