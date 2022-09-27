const { User } = require('../models');
const errorGenerate = require('../utils/genericErrorHanlder');
const { generateToken } = require('../utils/JWT');
const { loginSchema, createUserSchema } = require('../utils/schemas');

const userIsValid = (payload) => {
    const { error } = loginSchema.validate(payload);

    if (error) {
        throw errorGenerate(400, error.message);
    }
};

const emailExist = async (email) => {
    const result = await User.findOne({
        attributes: ['id', 'displayName', 'email', 'image'],
        where: { email },
    });
    return result;
};

const userExist = async (email, password) => {
    const user = await User.findOne({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { email, password },
});
    return user;
};

const authenticate = async ({ email, password }) => {
    userIsValid({ email, password });

    const user = await userExist(email, password);

    if (!user) {
        const error = errorGenerate(400, 'Invalid fields');

        throw error;
    }

    const token = generateToken(user.dataValues);

    return { token };
};

    const creatUser = async (user) => {
        const { error } = createUserSchema.validate(user);

        if (error) throw errorGenerate(400, error.message);

        const isUser = await emailExist(user.email);

        if (isUser !== null) throw errorGenerate(409, 'User already registered');

        const newUser = await User.create({ ...user });
        console.log('newUser >_ ', newUser.dataValues);
        const token = generateToken(newUser.dataValues);

        return { token };
    };

    const getUsers = async () => {
        const users = await User.findAll();
        return users;
    };

module.exports = {
    authenticate,
    creatUser,
    getUsers,
};