const express = require('express');

const authController = require('../controllers/authController');

const routers = express.Router();

routers.post('/', authController.auth);

module.exports = routers;