import express from 'express';
import { imageUploader } from '../controllers/imageUploader.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', imageUploader);

export default router;
