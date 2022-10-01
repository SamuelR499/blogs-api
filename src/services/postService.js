const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');
const errorGenerate = require('../utils/genericErrorHanlder');
const { createPostSchema } = require('../utils/schemas');

const categoryExists = async (categoryIds) => {
  const category = await (await Promise.all(categoryIds.map((id) => (
    Category.findOne({ where: { id } })
  )))).every((elem) => elem !== null);

  return category;
};

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

const addPost = async (post, userId) => { 
  const { title, content, categoryIds } = post;
  const { error } = createPostSchema.validate(post);

  if (error) throw errorGenerate(400, 'Some required fields are missing');

  const isCategory = await categoryExists(categoryIds);
  if (!isCategory) throw errorGenerate(400, '"categoryIds" not found');

  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create(
        { title, content, userId, categoryIds },
        { transaction: t },
    );

    console.log('newPost ---------->', newPost.dataValues);
    const postId = newPost.dataValues.id;

    await Promise.all(categoryIds.map(async (id) => PostCategory
    .create({ postId, categoryId: id }, { transaction: t })));
    return newPost;
  });
  console.log('result ---------->', result);
return result;
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
