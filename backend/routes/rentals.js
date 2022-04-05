import express from 'express'
import { getRentals, getRental, createRental, updateRental, deleteRental } from '../controllers/rentals.js'

import PropertyModel from '../models/rentalsModel.js'

import { protect } from '../middleware/auth.js'
import { advancedQueries } from '../middleware/advancedQueries.js'

const router = express.Router()

router
  .route('/')
  .get(
    advancedQueries(PropertyModel, [{ path: 'publisher', select: 'name avatar' }, 'property', 'publisher_profile']),
    getRentals
  )
  .post(protect, createRental)
router.route('/:id').get(getRental).put(protect, updateRental).delete(protect, deleteRental)

export default router
