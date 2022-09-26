const { User } = require('../models');
const errorGenerate = require('../utils/genericErrorHanlder');
const { generateToken } = require('../utils/JWT');

const authenticate = async ({ email, password }) => {
    if (!email || !password) {
        const error = errorGenerate(400, 'Some required fields are missing', 'Missing field');

        throw error;
    }

    const user = await User.findOne({
        attributes: ['id', 'displayName', 'email', 'image'],
        where: { email, password },
    });
    console.log('suer no service => ', user);
    if (!user) {
        const error = errorGenerate(400, 'Invalid fields', 'Invalid field');

        throw error;
    }

    const token = generateToken(user.dataValues);

    return { token };
};

module.exports = {
    authenticate,
};