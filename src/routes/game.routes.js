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
 *           example: "The Legend of Zelda: Breath of the Wild"
 *         description:
 *           type: string
 *           description: Detailed description of the game
 *           example: An action-adventure game set in a vast open world where you can explore, fight, and solve puzzles.
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: The game's price in USD
 *           example: 59.99
 *         platform:
 *           type: string
 *           enum: [PC, PlayStation, Xbox, Nintendo Switch]
 *           description: The game's platform
 *           example: Nintendo Switch
 *         genre:
 *           type: string
 *           enum: [Action, Adventure, RPG, Strategy, Sports, Racing, Puzzle]
 *           description: The game's genre
 *           example: Adventure
 *         stock:
 *           type: integer
 *           minimum: 0
 *           description: Available stock quantity
 *           example: 50
 *         coverImage:
 *           type: string
 *           format: binary
 *           description: The game's cover image
 *     GameResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             game:
 *               $ref: '#/components/schemas/Game'
 *     GamesListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             games:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *             page:
 *               type: integer
 *               example: 1
 *             pages:
 *               type: integer
 *               example: 5
 *             total:
 *               type: integer
 *               example: 50
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
 *     description: Retrieve a paginated list of games with optional filtering
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
 *               $ref: '#/components/schemas/GamesListResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.get('/', getGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     description: Retrieve detailed information about a specific game
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
 *               $ref: '#/components/schemas/GameResponse'
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.get('/:id', getGame);

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Add a new game to the marketplace (Admin only)
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *           example:
 *             title: "The Legend of Zelda: Breath of the Wild"
 *             description: An action-adventure game set in a vast open world
 *             price: 59.99
 *             platform: Nintendo Switch
 *             genre: Adventure
 *             stock: 50
 *             coverImage: (binary)
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameResponse'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Not admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Not authorized as admin
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.post('/', protect, admin, upload.single('coverImage'), gameValidation, createGame);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game
 *     description: Modify an existing game's details (Admin only)
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
 *           example:
 *             title: "The Legend of Zelda: Breath of the Wild"
 *             description: Updated game description
 *             price: 49.99
 *             platform: Nintendo Switch
 *             genre: Adventure
 *             stock: 75
 *             coverImage: (binary)
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameResponse'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Not admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Not authorized as admin
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.put('/:id', protect, admin, upload.single('coverImage'), gameValidation, updateGame);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     description: Remove a game from the marketplace (Admin only)
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: null
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Not admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Not authorized as admin
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', protect, admin, deleteGame);

module.exports = router;
