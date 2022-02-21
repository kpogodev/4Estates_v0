import mongoose from 'mongoose';
import { useSetLocation } from '../hooks/propertiesHooks.js';

export const propertiesSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'Please provide an address'],
    },
    type: {
      type: String,
      required: [true, 'Please select property type'],
      enum: ['house', 'flat', 'apartament', 'bungalow', 'land', 'commercial'],
    },
    description: {
      type: String,
      required: [true, 'Please provide some description'],
    },
    keyFeatures: [String],
    bedrooms: {
      type: Number,
      min: [1, 'Property must have at least 1 bedroom'],
    },
    bathrooms: {
      type: Number,
      min: [1, 'Property must have at least 1 bathroom'],
    },
    size: Number,
    saleHistory: [Date],
    images: [
      {
        cloudinary_id: String,
        width: Number,
        height: Number,
        format: String,
        secure_url: String,
      },
    ],
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],

        index: '2dsphere',
      },
      formatedAddres: String,
      street: String,
      city: String,
      postcode: String,
      county: String,
      country: String,
      neighborhood: String,
    },
    publisher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Hooks
useSetLocation();

const PropertyModel = mongoose.model('Property', propertiesSchema);
export default PropertyModel;
