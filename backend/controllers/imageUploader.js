import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from 'express-async-handler';
import PropertyModel from '../models/propertiesModel.js';
import cloudinary from '../utils/cloudinary.js';

export const imageUploader = asyncHandler(async (req, res, next) => {
  const { data, id } = req.body;

  const imageUploadPromises = data.map(async (item) => {
    return cloudinary.uploader.upload(item, { upload_preset: '4estates' });
  });

  const imageUploadResponses = await Promise.all(imageUploadPromises);

  const newImages = imageUploadResponses.map((response) => {
    return {
      cloudinary_id: response.public_id,
      width: response.width,
      height: response.height,
      format: response.format,
      secure_url: response.secure_url,
    };
  });

  const property = await PropertyModel.findById(id);

  if (property) {
    property.images = [...property.images, ...newImages];
  }

  await property.save();

  res.json({ success: true, data: property });
});
