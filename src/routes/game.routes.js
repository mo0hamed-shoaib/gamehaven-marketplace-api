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

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - platform
 *         - genre
 *         - stock
 *       properties:
 *         title:
 *           type: string
 *           description: The game's title
 *         description:
 *           type: string
 *           description: The game's description
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: The game's price
 *         platform:
 *           type: string
 *           enum: [PC, PlayStation, Xbox, Nintendo Switch]
 *           description: The game's platform
 *         genre:
 *           type: string
 *           enum: [Action, Adventure, RPG, Strategy, Sports, Racing, Puzzle]
 *           description: The game's genre
 *         stock:
 *           type: integer
 *           minimum: 0
 *           description: Available stock quantity
 *         coverImage:
 *           type: string
 *           format: binary
 *           description: The game's cover image
 */

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

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *           enum: [Action, Adventure, RPG, Strategy, Sports, Racing, Puzzle]
 *         description: Filter by genre
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *           enum: [PC, PlayStation, Xbox, Nintendo Switch]
 *         description: Filter by platform
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in game titles
 *     responses:
 *       200:
 *         description: List of games
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     games:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Game'
 *                     page:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     total:
 *                       type: integer
 */
router.get('/', getGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     game:
 *                       $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 */
router.get('/:id', getGame);

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     game:
 *                       $ref: '#/components/schemas/Game'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not admin
 *       400:
 *         description: Invalid input data
 */
router.post('/', protect, admin, upload.single('coverImage'), gameValidation, createGame);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     game:
 *                       $ref: '#/components/schemas/Game'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not admin
 *       404:
 *         description: Game not found
 *       400:
 *         description: Invalid input data
 */
router.put('/:id', protect, admin, upload.single('coverImage'), gameValidation, updateGame);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not admin
 *       404:
 *         description: Game not found
 */
router.delete('/:id', protect, admin, deleteGame);

module.exports = router;
