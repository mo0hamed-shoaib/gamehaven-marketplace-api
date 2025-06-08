const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    try {
        // Extract token from Authorization header (Bearer token)
        const token = req.headers.authorization?.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Not authorized, no token',
            });
        }

        // Verify token and decode user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from decoded token, exclude password field
        const user = await User.findById(decoded.id).select('-password');

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Not authorized, user not found',
            });
        }

        // Attach user object to request for use in protected routes
        req.user = user;
        next();
    } catch (error) {
        // Pass any errors to error handling middleware
        next(error);
    }
};

const admin = (req, res, next) => {
    // Check if user exists and has admin role
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            status: 'error',
            message: 'Not authorized as admin',
        });
    }
};

module.exports = { protect, admin };
