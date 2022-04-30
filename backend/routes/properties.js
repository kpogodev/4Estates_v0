import express from 'express'
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
  deletePropertyImage,
} from '../controllers/properties.js'

import PropertyModel from '../models/propertiesModel.js'

import { protect } from '../middleware/auth.js'
import { advancedQueries } from '../middleware/advancedQueries.js'

const router = express.Router()

router.route('/upload').post(protect, uploadPropertyImages).delete(protect, deletePropertyImage)
router.route('/').get(advancedQueries(PropertyModel), getProperties).post(protect, createProperty)
router.route('/:id').get(getProperty).put(protect, updateProperty).delete(protect, deleteProperty)

export default router
