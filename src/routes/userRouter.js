const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, userController.findById);

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getUsers);

module.exports = router;