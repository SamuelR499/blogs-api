const { User } = require('../models');
const generateToken = require('../utils/JWT');

const authenticate = async ({ email, password }) => {
    if (!email || !password) {
        const status = 400;
        const message = 'Some required fields are missing';

        const error = { status, message };
        throw error;
    }

    const user = await User.findOne({
        attributes: ['id', 'displayName', 'email', 'image'],
        where: { email, password },
    });

    if (!user) {
        const status = 400;
        const message = 'Invalid fields';

        const error = { status, message };
        throw error;
    }

    const token = generateToken(user.dataValues);

    return { token };
};

module.exports = {
    authenticate,
};