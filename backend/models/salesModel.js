import mongoose from 'mongoose'
import PropertyModel from './propertiesModel.js'
import uniqueValidator from 'mongoose-unique-validator'

export const salesSchema = mongoose
  .Schema(
    {
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
        required: [true, 'Sale must have a publisher'],
      },
      additional_info: {
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
    },
    { timestamps: true }
  )
  .plugin(uniqueValidator, { message: '{PATH} must be unique' })

//Reverse populate with virtuals
salesSchema.virtual('publisher_profile', {
  ref: 'Profile',
  localField: 'publisher',
  foreignField: 'user',
  justOne: true,
})

salesSchema.pre('save', async function (next) {
  await PropertyModel.findOneAndUpdate(
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

salesSchema.pre('remove', async function (next) {
  await PropertyModel.findOneAndUpdate(
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

const SaleModel = mongoose.model('Sale', salesSchema)
export default SaleModel
