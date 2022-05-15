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
      enum: ['detached', 'semi-detached', 'terraced', 'flat', 'apartment', 'bungalow', 'land', 'commercial']
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
        min: [0, 'Number of bedrooms cannot be less than 0'],
      },
      bathrooms: {
        type: Number,
        min: [0, 'Number of bathrooms cannot be less than 0'],
      },
      size: {
        type: Number,
        min: [0, 'Size of the property cannot be less than 0'],
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
    let profile = await this.model('Profile').findOne({ user: this.publisher })
    const rental = await this.model('Rental').findOne({ property: this._id })
    const sale = await this.model('Sale').findOne({ property: this._id })

    if (rental) {
      profile.rents = profile.rents.filter((rent) => rent.toString() !== rental._id.toString())
      profile.save()
      rental.remove()
    }

    if (sale) {
      profile.sales = profile.sales.filter((sale) => sale.toString() !== sale._id.toString())
      profile.save()
      sale.remove()
    }

    next()
  } catch (error) {
    next(error)
  }
})

//Hooks
useSetLocation()

const PropertyModel = mongoose.model('Property', propertiesSchema)
export default PropertyModel
