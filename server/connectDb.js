import mongoose from 'mongoose';
import asyncHandler from './utils/asyncHandler.js';

const connectDb = asyncHandler(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
});

export default connectDb;
