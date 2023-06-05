import express from 'express';
import { registerUser, loginUser } from '../controller/authController.js'
import { validateRegistration, validateLogin } from'../validators/authValidator.js';

const router = express.Router();

// POST /api/register
router.post('/register', validateRegistration, registerUser);

// POST /api/login
router.post('/login', validateLogin, loginUser);

export default router;
