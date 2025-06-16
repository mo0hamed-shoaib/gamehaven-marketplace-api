const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const gameRoutes = require('./game.routes');
const orderRoutes = require('./order.routes');
const reviewRoutes = require('./review.routes');

const router = express.Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
