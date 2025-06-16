const express = require('express');
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
} = require('../controllers/game.controller');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

//validation
const gameValidation = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('description').trim().notEmpty().withMessage('description is required'),
  body('price').isFloat({ min: 0 }).withMessage('price must be positive'),
  body('platform')
    .isIn(['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'])
    .withMessage('platform not available'),
  body('genre')
    .isIn(['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Racing', 'Puzzle'])
    .withMessage('invalid genre'),
  body('stock').isInt({ min: 0 }).withMessage('stock must be positive'),
];

// Public routes
router.get('/', getGames);
router.get('/:id', getGame);

//admin routes
router.post('/', protect, admin, upload.single('coverImage'), gameValidation, createGame);
router.put('/:id', protect, admin, upload.single('coverImage'), gameValidation, updateGame);
router.delete('/:id', protect, admin, deleteGame);

module.exports = router;
