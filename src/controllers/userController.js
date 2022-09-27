const userService = require('../services/userService');

const auth = async (req, res, next) => {
    try {
        const authToken = await userService.authenticate(req.body);
        return res.status(200).json(authToken);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const token = await userService.creatUser(req.body);
        return res.status(201).json(token);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (_req, res, next) => {
    try {
        const users = await userService.getUsers();
    
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userService.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    auth,
    createUser,
    getUsers,
    findById,
};