import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  // Remove password from output
  user.password = undefined;
  user.confirmPassword = undefined;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

export const signup = async (req, res, next) => {
  try {
    let { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already exists',
      });
    }
    const newUser = await User.create({
      email,
      password,
      confirmPassword,
      role,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const googleCallback = (req, res) => {
  const token = signToken(req.user._id);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.redirect(`${process.env.CLIENT_URL}`);
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

export const fetchCurrentUser = (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Not authenticated' });
  }
  res.status(200).json({
    status: 'success',
    user: {
      _id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
  });
};
