import { registerUser, loginUser, generateToken } from '../services/authService.js';
import User from '../models/userModel.js';

export const signup = async (req, res) => {
  try {
    const { fname, lname, email, password, confirmPassword } = req.body;

    if (!fname || !lname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields (fname, lname, email, password, confirmPassword) are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
 
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await registerUser({ fname, lname, email, password });
    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await loginUser(email, password);
      res.json({
        message: 'Login successful',
        token: generateToken(user._id),
        user: {
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};
