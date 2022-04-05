import express from 'express'
import { getSales, getSale, createSale, updateSale, deleteSale } from '../controllers/sales.js'

import SaleModel from '../models/salesModel.js'

import { protect } from '../middleware/auth.js'
import { advancedQueries } from '../middleware/advancedQueries.js'

const router = express.Router()

router
  .route('/')
  .get(
    advancedQueries(SaleModel, [{ path: 'publisher', select: 'name avatar' }, 'property', 'publisher_profile']),
    getSales
  )
  .post(protect, createSale)
router.route('/:id').get(getSale).put(protect, updateSale).delete(protect, deleteSale)

export default router
