const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, postController.findById);
// router.put('/:id', authMiddleware, postController.updatePost);

router.get('/', authMiddleware, postController.getPosts);
router.post('/', authMiddleware, postController.addPost);
module.exports = router;