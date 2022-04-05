import mongoose from 'mongoose'

export const salesSchema = mongoose.Schema(
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
      required: [true, 'A rental must have a publisher'],
    },
    sale_history: [
      {
        date: Date,
        price: {
          type: Number,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
)

const SaleModel = mongoose.model('Sale', salesSchema)
export default SaleModel
