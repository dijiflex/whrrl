/* eslint-disable func-names */
/* eslint-disable no-return-await */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'First Name required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please Provide a valid email'],
    },
    phoneNumber: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    photo: { type: String, default: 'default.jpg' },
    password: {
      type: String,
      required: [true, '{Password Required'],
      minlength: 4,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password Confirmatin Require'],
      validate: {
        //custom validator only works on save and create
        validator(el) {
          return el === this.password;
        },
        message: 'Password do not match',
      },
    },
    nationality: String,
    passwordCreatedAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    verification: String,
  },
  { timestamps: true }
);
//INDEX
userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

//INSTANCE METHOD TO verify passowrd
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//INSTANCE method to check if password was changed afer the jwt was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

//INSTANCE METHOD ot create and reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
