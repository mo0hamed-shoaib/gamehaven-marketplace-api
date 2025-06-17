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
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantity of the game
 *     Cart:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               game:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   coverImage:
 *                     type: string
 *               quantity:
 *                 type: integer
 *               subtotal:
 *                 type: number
 *         total:
 *           type: number
 *           description: Total cart amount
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
 * /cart:
 *   get:
 *     summary: Get user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details
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
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Not authorized
 */
router.get('/', getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Item added to cart successfully
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
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Game not found
 */
router.post('/', cartItemValidation, addToCart);

/**
 * @swagger
 * /cart/{itemId}:
 *   put:
 *     summary: Update cart item quantity
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
 *     responses:
 *       200:
 *         description: Cart item updated successfully
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
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Cart item not found
 */
router.put('/:itemId', cartItemValidation, updateCartItem);

/**
 * @swagger
 * /cart/{itemId}:
 *   delete:
 *     summary: Remove item from cart
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
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Cart item not found
 */
router.delete('/:itemId', removeFromCart);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
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
 *                     cart:
 *                       $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Not authorized
 */
router.delete('/', clearCart);

module.exports = router;