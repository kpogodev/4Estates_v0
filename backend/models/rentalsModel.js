import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

export const rentalsSchema = mongoose
  .Schema(
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
  .plugin(uniqueValidator, { message: '{PATH} must be unique' })

//Reverse populate with virtuals
rentalsSchema.virtual('publisher_profile', {
  ref: 'Profile',
  localField: 'publisher',
  foreignField: 'user',
  justOne: true,
})

rentalsSchema.pre('save', async function (next) {
  await this.model('Property').findOneAndUpdate(
    { _id: this.property },
    { is_published: true },
    {
      new: true,
      runValidators: false,
      timestamps: true,
    }
  )
  next()
})

rentalsSchema.pre('remove', async function (req, res, next) {
  await this.model('Property').findOneAndUpdate(
    { _id: this.property },
    { is_published: false },
    {
      new: true,
      runValidators: false,
      timestamps: true,
    }
  )
  next()
})

const RentalModel = mongoose.model('Rental', rentalsSchema)
export default RentalModel
