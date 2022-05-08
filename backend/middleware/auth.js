import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import UserModel from '../models/usersModel.js';
import cookie from 'cookie';

//Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (!req.headers.cookie) return next(new ErrorResponse('Not authorized to access this route', 401));
  const cookies = cookie.parse(req.headers.cookie);

  if (cookies.token) {
    token = cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new ErrorResponse('Not authorized to access this route', 401));

  try {
    //Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

//Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User with role of '${req.user.subscription.id}' - is not authorized to access this route`, 403)
      );
    }
    next();
  };
};
