const express = require('express');
const {body} = require('express-validator');
const {protect, admin} = require('../middleware/auth.middleware');
const {createGame, updateGame, deleteGame} = require('../controllers/dummyGame.controller');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

//admin routes
router.post('/', protect, admin, upload.single('coverImage'), createGame);
router.put('/:id', protect, admin, upload.single('coverImage'), updateGame);
router.delete('/:id', protect, admin, deleteGame);

module.exports = router;