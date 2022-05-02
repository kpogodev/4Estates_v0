import { userSchema } from '../models/usersModel.js'
import ProfileModel from '../models/profilesModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

//Encrypt Password using bcrypt
export const useEncryptPassword = () => {
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
}

// Sign JWT and return
export const getJwtToken = () => {
  userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.NODE_ENV === 'development' ? '30d' : process.env.JWT_EXPIRE,
    })
  }
}

// Match user entered password to hased password in db
export const matchUserPassword = () => {
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
}

// Generate and hash forgotten password token
export const generateForgottenPasswordToken = () => {
  userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')
    // Hash token and set the fields
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //Set expire
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
  }
}

// Initialize User Profile
export const initUserProfile = () => {
  userSchema.post('save', async function () {
    const profile = await ProfileModel.findOne({ user: this._id })

    if (!profile) {
      ProfileModel.create({ user: this._id })
    }
  })
}
