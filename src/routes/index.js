const express = require('express');
const authRoutes = require('./auth.routes');
const gameRoutes = require('./game.routes');
const orderRoutes = require('./order.routes');

const router = express.Router();

// API routes
router.use('/auth', authRoutes);
router.use('/games', gameRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
