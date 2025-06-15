const Game = require('../models/game.model');
const { validationResult } = require('express-validator');

// @desc    Get all games
// @route   GET /api/games
// @access  Public
const getGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const query = {};
    if (req.query.genre) query.genre = req.query.genre;
    if (req.query.platform) query.platform = req.query.platform;
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const games = await Game.find(query).skip(startIndex).limit(limit).sort({ createdAt: -1 });

    const total = await Game.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        games,
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Get single game
// @route   GET /api/games/:id
// @access  Public
const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({
        status: 'error',
        message: 'Game not found',
      });
    }

    res.json({
      status: 'success',
      data: { game },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Create game
// @route   POST /api/games
// @access  Private/Admin
const createGame = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const game = await Game.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { game },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Update game
// @route   PUT /api/games/:id
// @access  Private/Admin
const updateGame = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!game) {
      return res.status(404).json({
        status: 'error',
        message: 'Game not found',
      });
    }

    res.json({
      status: 'success',
      data: { game },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private/Admin
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return res.status(404).json({
        status: 'error',
        message: 'Game not found',
      });
    }

    res.json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
};
