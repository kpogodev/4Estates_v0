import ErrorResponse from '../utils/errorResponse.js';

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found.`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered for ${Object.keys(error.keyPattern)[0]}`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV !== 'production' && error.stack,
  });
};

export { notFound, errorHandler };
