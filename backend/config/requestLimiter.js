import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

export const requestLimiterAuth = rateLimit({
  windowMs: process.env.NODE_ENV === 'production' ? process.env.REQUEST_AUTH_LIMIT_FREQUENCT : 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? process.env.REQUEST_AUTH_LIMIT : 1000000,
});

export const requestLimiterProperties = rateLimit({
  windowMs: process.env.NODE_ENV === 'production' ? process.env.REQUEST_PROPERTY_LIMIT_FREQUENCT : 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? process.env.REQUEST_PROPERTY_LIMIT : 1000000,
});
