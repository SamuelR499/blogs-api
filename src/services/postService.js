const { BlogPost, User, Category } = require('../models');
// const errorGenerate = require('../utils/genericErrorHanlder');

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
  console.log('posts in service >_  ', posts);
  return posts;
};

module.exports = {
  getPosts,
};
