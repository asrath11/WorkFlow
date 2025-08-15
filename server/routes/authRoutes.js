import express from 'express';
import { signup, signin, logout } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
export default router;
