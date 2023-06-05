// controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import authService from '../service/authService.js';
import jwt from 'jsonwebtoken';

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token for the user
    const token = jwt.sign({ userId: User._id }, 'secretkey');
    // save user token
    User.token = token;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user
    const { user, token } = await authService.authenticateUser(email, password);

    res.json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid email or password' });
  }
};

export { registerUser, loginUser };
