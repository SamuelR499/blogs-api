const express = require('express');

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, categoryController.addCategory);

router.get('/', authMiddleware, categoryController.getCategories);

module.exports = router;