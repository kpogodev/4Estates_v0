import express from 'express';
import { getProfiles, getProfile, createProfile, updateProfile, deleteProfile } from '../controllers/profiles.js';

import ProfileModel from '../models/profilesModel.js';

import { protect } from '../middleware/auth.js';
import { advancedQueries } from '../middleware/advancedQueries.js';

const router = express.Router();

router
  .route('/')
  .get(advancedQueries(ProfileModel, { path: 'user', select: ['avatar', 'name'] }), getProfiles)
  .post(protect, createProfile);
router.route('/:id').get(getProfile).put(protect, updateProfile).delete(protect, deleteProfile);

export default router;
