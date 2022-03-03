import mongoose from 'mongoose';
import {
  useEncryptPassword,
  getJwtToken,
  matchUserPassword,
  generateForgottenPasswordToken,
} from '../hooks/authHooks.js';

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
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must consist of at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'landlord', 'agency'],
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
    contact: {
      email: {
        type: String,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email address',
        ],
      },
      address: String,
      phone: String,
      fax: String,
      socials: {
        facebook: String,
        linkedin: String,
      },
      website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL starting with HTTP/HTTPS',
        ],
      },
    },
    observed: {
      sales: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sale',
        },
      ],
      rents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rent',
        },
      ],
    },
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
    rents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rent' }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//Hooks & Methods
useEncryptPassword();
getJwtToken();
matchUserPassword();
generateForgottenPasswordToken();

const User = mongoose.model('User', userSchema);
export default User;
