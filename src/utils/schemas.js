const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  }),
  password: Joi.string().required().min(5).messages({
    'any.required': 'Some required fields are missing',
  }),
});

const createUserSchema = Joi.object({
  displayName: Joi.string().required().min(8),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  image: Joi.string(),
});

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

module.exports = {
  loginSchema,
  createUserSchema,
  createCategorySchema,
  createPostSchema,
};
