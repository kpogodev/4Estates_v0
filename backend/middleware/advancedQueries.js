import ErrorResponse from '../utils/errorResponse.js'
import geocoder from '../utils/geocoder.js'
import PropertyModel from '../models/propertiesModel.js'
import dot from 'dot-object'

export const advancedQueries = (model, populate) => async (req, res, next) => {
  let query

  //Copy req.query
  const requestQuery = { ...req.query }

  //Fileds to exclude
  const removeFields = ['select', 'sort', 'limit', 'page', 'address', 'radius', 'property_bedrooms', 'property_type']

  //Loop over removeFields and delete them from requestQuery
  removeFields.forEach((param) => delete requestQuery[param])

  //Create query string
  let queryString = JSON.stringify(requestQuery)

  //Create operators ($gt,%gte, etc..)
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  //Finding resource
  query = model.find(JSON.parse(queryString))

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  //Populate
  if (populate) {
    query = query.populate(populate)
  }

  //Special Queries for Rental and Sales
  const { address, radius, property_bedrooms, property_type } = req.query
  if ((model.modelName === 'Rental' || model.modelName === 'Sale') && ((address && radius) || property_bedrooms || property_type)) {
    let propertyRequestQuery = {}

    if (property_bedrooms) {
      propertyRequestQuery = JSON.parse(
        JSON.stringify({ ...propertyRequestQuery, ['details.bedrooms']: req.query.property_bedrooms }).replace(
          /\b(gt|gte|lt|lte|in)\b/g,
          (match) => `$${match}`
        )
      )
    }

    if (property_type) {
      propertyRequestQuery = { ...propertyRequestQuery, type: req.query.property_type }
    }

    let propertyQuery = PropertyModel.find(propertyRequestQuery)

    if (address && radius) {
      const loc = await geocoder.geocode(address.split('+').join(' '))
      const earthRadius = 3963 // miles
      const formattedRadius = +radius / earthRadius
      propertyQuery = propertyQuery.find({
        location: {
          $geoWithin: { $centerSphere: [[loc[0].latitude, loc[0].longitude], formattedRadius > 1 ? 1 : formattedRadius] },
        },
      })
    }

    const properties = await propertyQuery

    query = query.in(
      'property',
      properties.map((property) => property._id)
    )
  }

  // Pagination
  const page = +req.query.page || 1
  const limit = +req.query.limit || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.estimatedDocumentCount()

  query = query.skip(startIndex).limit(limit)

  //Pagination result
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  //Executimg query
  const results = await query

  // Error if resources not found
  if (!results || results.length === 0) return next(new ErrorResponse('Resources not found', 404))

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  }

  next()
}
