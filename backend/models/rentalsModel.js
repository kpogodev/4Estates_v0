import mongoose from 'mongoose'

export const rentalsSchema = mongoose.Schema(
  {
    available_from: {
      type: Date,
    },
    deposit: {
      type: Number,
      min: 0,
    },
    furnished: {
      type: Boolean,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: [true, 'Property must be provided'],
      unique: true,
    },
    publisher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A rental must have a publisher'],
    },
    tenancy_info: {
      time: Number,
      blocks: [
        {
          _id: false,
          id: {
            type: String,
            unique: true,
          },
          type: {
            type: String,
            required: [true, 'Type of the block is required'],
          },
          data: {
            text: {
              type: String,
            },
            level: {
              type: Number,
            },
            style: {
              type: String,
            },
            items: {
              type: [String],
            },
          },
        },
      ],
      version: String,
    },
    rental_type: {
      type: String,
      enum: ['long', 'short'],
      required: [true, 'Rental type is required'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

//Reverse populate with virtuals
rentalsSchema.virtual('publisher_profile', {
  ref: 'Profile',
  localField: 'publisher',
  foreignField: 'user',
  justOne: true,
})

const RentalModel = mongoose.model('Rental', rentalsSchema)
export default RentalModel
