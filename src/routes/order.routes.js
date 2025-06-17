const express = require('express');
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/auth.middleware');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} = require('../controllers/order.controller');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - game
 *         - quantity
 *       properties:
 *         game:
 *           type: string
 *           description: Game ID
 *           example: 60d21b4667d0d8992e610c85
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantity of the game
 *           example: 2
 *     Order:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         status:
 *           type: string
 *           enum: [pending, completed, cancelled]
 *           default: pending
 *           description: Order status
 *           example: pending
 *         totalAmount:
 *           type: number
 *           description: Total order amount
 *           example: 119.98
 *         user:
 *           type: string
 *           description: User ID who placed the order
 *           example: 60d21b4667d0d8992e610c86
 *     OrderResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             order:
 *               $ref: '#/components/schemas/Order'
 *     OrdersListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             orders:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
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

const orderStatusValidation = [
  body('status').isIn(['pending', 'completed', 'cancelled']).withMessage('invalid order status')
];

//all need a signed in user
router.use(protect);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     description: Retrieve a paginated list of orders for the currently logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersListResponse'
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
router.get('/', getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     description: Retrieve detailed information about a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Order not found
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
router.get('/:id', getOrder);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with items from the user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *           example:
 *             items:
 *               - game: 60d21b4667d0d8992e610c85
 *                 quantity: 2
 *               - game: 60d21b4667d0d8992e610c86
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ServerError'
 */
router.post('/', createOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     description: Change the status of an existing order (pending, completed, or cancelled)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *                 description: New order status
 *           example:
 *             status: completed
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid status
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
 *         description: Order not found
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
router.put('/:id/status', admin, orderStatusValidation, updateOrderStatus);

module.exports = router;
