const postService = require('../services/postService');

const getPosts = async (_req, res, next) => {
  try {
    const posts = await postService.getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const addPost = async (req, res, next) => {
  try {
    const newPost = await postService.addPost(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
      const post = await postService.findById(id);
      return res.status(200).json(post);
  } catch (error) {
      next(error);
  }
};

module.exports = {
  getPosts,
  addPost,
  findById,
};
