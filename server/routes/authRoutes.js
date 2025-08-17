import express from 'express';
import passport from 'passport';
import {
  signup,
  signin,
  logout,
  googleCallback,
  fetchCurrentUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/fetchCurrentUser', protect, fetchCurrentUser);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  googleCallback
);

export default router;
