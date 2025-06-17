const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth.middleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cart.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - gameId
 *         - quantity
 *       properties:
 *         gameId:
 *           type: string
 *           description: ID of the game to add to cart
 *           example: 60d21b4667d0d8992e610c85
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantity of the game
 *           example: 2
 *     CartItemResponse:
 *       type: object
 *       properties:
 *         game:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 60d21b4667d0d8992e610c85
 *             title:
 *               type: string
 *               example: "The Legend of Zelda: Breath of the Wild"
 *             price:
 *               type: number
 *               example: 59.99
 *             coverImage:
 *               type: string
 *               example: https://example.com/images/zelda.jpg
 *         quantity:
 *           type: integer
 *           example: 2
 *         subtotal:
 *           type: number
 *           example: 119.98
 *     Cart:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItemResponse'
 *         total:
 *           type: number
 *           description: Total cart amount
 *           example: 119.98
 *     CartResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             cart:
 *               $ref: '#/components/schemas/Cart'
 */

// Validation middleware
const cartItemValidation = [
  body('gameId').isMongoId().withMessage('Invalid game ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

// All routes are protected
router.use(protect);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's shopping cart
 *     description: Retrieve the current user's shopping cart with all items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.get('/', getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
 *     description: Add a new game to the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *           example:
 *             gameId: 60d21b4667d0d8992e610c85
 *             quantity: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
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
router.post('/', cartItemValidation, addToCart);

/**
 * @swagger
 * /api/cart/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     description: Modify the quantity of an item in the shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *           example:
 *             gameId: 60d21b4667d0d8992e610c85
 *             quantity: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
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
 *       404:
 *         description: Cart item not found
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
router.put('/:itemId', cartItemValidation, updateCartItem);

/**
 * @swagger
 * /cart/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     description: Remove a specific item from the shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Cart item not found
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
router.delete('/:itemId', removeFromCart);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear entire cart
 *     description: Remove all items from the shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.delete('/', clearCart);

module.exports = router;