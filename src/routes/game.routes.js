const express = require('express');
const {body} = require('express-validator');
const {protect, admin} = require('../middleware/auth.middleware');
const {createGame, updateGame, deleteGame} = require('../controllers/dummyGame.controller');
const upload = require('../middleware/upload.middleware');

module.exports = router;