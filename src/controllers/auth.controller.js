const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        // Validate request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;

        // Check if user with provided email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists',
            });
        }

        // Create new user in database
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user', // Use provided role or default to 'user'
        });

        // Generate JWT token for the new user
        const token = generateToken(user._id);

        // Return success response with user data and token
        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        // Validate request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials',
            });
        }

        // Verify password using the comparePassword method from user model
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials',
            });
        }

        // Generate JWT token for authenticated user
        const token = generateToken(user._id);

        // Return success response with user data and token
        res.json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            },
        });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

// Export the controller functions
module.exports = {
    register,
    login,
};