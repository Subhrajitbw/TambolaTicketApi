// services/authService.js
import bcrypt from'bcrypt';
import jwt from'jsonwebtoken';
import User from'../models/User.js';

const generateAuthToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
  return token;
};

const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = generateAuthToken(user._id);

    return { user, token };
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded._id;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export default {
  generateAuthToken,
  authenticateUser,
  verifyAuthToken,
};
