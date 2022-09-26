const { User } = require('../models');
const errorGenerate = require('../utils/genericErrorHanlder');
const { generateToken } = require('../utils/JWT');
const { loginSchema } = require('../utils/schemas');

const userIsValid = (payload) => {
    const { error } = loginSchema.validate(payload);

    if (error) {
        throw errorGenerate(400, error.message);
    }
};

const authenticate = async ({ email, password }) => {
    userIsValid({ email, password });

    const user = await User.findOne({
        attributes: ['id', 'displayName', 'email', 'image'],
        where: { email, password },
    });

    if (!user) {
        const error = errorGenerate(400, 'Invalid fields');

        throw error;
    }

    const token = generateToken(user.dataValues);

    return { token };
};

module.exports = {
    authenticate,
};