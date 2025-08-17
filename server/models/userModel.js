import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
      required: function () {
        // password required only if not logging in with OAuth
        return !this.googleId;
      },
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          // only validate if password exists
          if (this.password) return el === this.password;
          return true; // skip validation for OAuth users
        },
        message: 'Passwords do not match!',
      },
      required: function () {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'intern'],
      default: 'user',
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving (only for local signup)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // confirmPassword is not needed in DB
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
