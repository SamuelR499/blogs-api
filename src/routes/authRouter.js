const express = require('express');

const authController = require('../controllers/userController');

const router = express.Router();

router.post('/', authController.auth);

module.exports = router;