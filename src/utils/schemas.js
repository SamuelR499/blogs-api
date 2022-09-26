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

module.exports = {
    loginSchema,
};