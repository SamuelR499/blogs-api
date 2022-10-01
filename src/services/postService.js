const { BlogPost, User, Category } = require('../models');
const errorGenerate = require('../utils/genericErrorHanlder');
const { createPostSchema } = require('../utils/schemas');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['user_id'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const addPost = async (post) => { 
  const { error } = createPostSchema.validate(post);

  if (error) throw errorGenerate(400, 'Some required fields are missing');

  const newPost = await post;
  return newPost;
};

const findById = async (id) => {
  const post = await BlogPost.findOne({
    attributes: { exclude: ['user_id'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
    where: { id },
  });

  if (!post) throw errorGenerate(404, 'Post does not exist');
  
  return post;
};

module.exports = {
  getPosts,
  addPost,
  findById,
};
