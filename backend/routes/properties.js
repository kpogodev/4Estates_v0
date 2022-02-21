import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/properties.js';

import PropertyModel from '../models/propertiesModel.js';

import { protect, authorize } from '../middleware/auth.js';
import { advancedQueries } from '../middleware/advancedQueries.js';

const router = express.Router();

router
  .route('/')
  .get(advancedQueries(PropertyModel), getProperties)
  .post(protect, authorize('agency', 'landlord'), createProperty);
router
  .route('/:id')
  .get(getProperty)
  .put(protect, authorize('agency', 'landlord'), updateProperty)
  .delete(protect, authorize('agency', 'landlord'), deleteProperty);

export default router;
