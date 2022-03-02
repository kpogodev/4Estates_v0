import express from 'express';
import { getProfiles, getProfile, createProfile, updateProfile, deleteProfile } from '../controllers/profiles.js';

import ProfileModel from '../models/profilesModel.js';

import { protect, authorize } from '../middleware/auth.js';
import { advancedQueries } from '../middleware/advancedQueries.js';

const router = express.Router();

router
  .route('/')
  .get(advancedQueries(ProfileModel), getProfiles)
  .post(protect, authorize('agency', 'landlord', 'user'), createProfile);
router
  .route('/:id')
  .get(getProfile)
  .put(protect, authorize('agency', 'landlord', 'user'), updateProfile)
  .delete(protect, authorize('agency', 'landlord', 'user'), deleteProfile);

export default router;
