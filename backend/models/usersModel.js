import mongoose from 'mongoose'
import {
  useEncryptPassword,
  getJwtToken,
  matchUserPassword,
  generateForgottenPasswordToken,
  initUserProfile,
} from '../hooks/authHooks.js'

export const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      length: [100, 'Name cannot be longer than 100 characters'],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email address',
      ],
      required: [true, 'Please provide an email address'],
      unique: true,
      select: false,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must consist of at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'agency'],
      required: true,
      default: 'user',
    },
    avatar: {
      cloudinary_id: String,
      width: Number,
      height: Number,
      format: String,
      secure_url: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
)

//Hooks & Methods
useEncryptPassword()
getJwtToken()
matchUserPassword()
generateForgottenPasswordToken()
initUserProfile()

const User = mongoose.model('User', userSchema)
export default User
