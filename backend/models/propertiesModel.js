import mongoose from 'mongoose'
import { useSetLocation } from '../hooks/propertiesHooks.js'

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
    details: {
      description: {
        type: String,
        required: [true, 'Please provide some description'],
        length: [3200, 'Desription cannot be longer than 3200 characters'],
      },
      key_features: [String],
      bedrooms: {
        type: Number,
        min: [1, 'Property must have at least 1 bedroom'],
      },
      bathrooms: {
        type: Number,
        min: [1, 'Property must have at least 1 bathroom'],
      },
      size: {
        type: Number,
        min: [1, 'Size of the property must be a postive number'],
      },
    },
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
      formatted_address: String,
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
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// Cascade delete all rentals when a property is deleted
propertiesSchema.pre('remove', async function (next) {
  try {
    await this.model('Rental').deleteMany({ property: this._id })
    await this.model('Sale').deleteMany({ property: this._id })
    next()
  } catch (error) {
    next(error)
  }
})

//Hooks
useSetLocation()

const PropertyModel = mongoose.model('Property', propertiesSchema)
export default PropertyModel
