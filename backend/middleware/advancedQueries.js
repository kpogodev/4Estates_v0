import ErrorResponse from '../utils/errorResponse.js';
import geocoder from '../utils/geocoder.js';

export const advancedQueries = (model, populate) => async (req, res, next) => {
  let query;

  //Copy req.query
  const requestQuery = { ...req.query };

  //Fileds to exclude
  const removeFields = ['select', 'sort', 'limit', 'page', 'postcode', 'city', 'radius'];

  //Loop over removeFields and delete them from requestQuery
  removeFields.forEach((param) => delete requestQuery[param]);

  //Create query string
  let queryString = JSON.stringify(requestQuery);

  //Create operators ($gt,%gte, etc..)
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  //Finding resource
  query = model.find(JSON.parse(queryString));

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.estimatedDocumentCount();

  query = query.skip(startIndex).limit(limit);

  //Populate
  if (populate) {
    query = query.populate(populate);
  }

  //Find by radius
  if (model.modelName === 'Property' && req.query.postcode && req.query.city && req.query.radius) {
    const { postcode, city, radius } = req.query;

    if (!postcode || !city)
      return next(new ErrorResponse('postcode and city are required to proceed with this query', 400));
    const findBy = `${city.replace('_', ' ')}, ${postcode}`;

    const loc = await geocoder.geocode(findBy);

    const earthRadius = 3963;
    const formatedRadius = +radius / earthRadius;

    query = model.find({
      location: {
        $geoWithin: { $centerSphere: [[loc[0].latitude, loc[0].longitude], formatedRadius > 1 ? 1 : formatedRadius] },
      },
    });
  }
  
  //Executimg query
  const results = await query;

  // Error if resources not found
  if (!results || results.length === 0) return next(new ErrorResponse('Resources not found', 404));

  //Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};
