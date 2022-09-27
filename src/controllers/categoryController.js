const categoryService = require('../services/categoryService');

const addCategory = async (req, res, next) => {
    try {
        const newCategory = await categoryService.addCategory(req.body);
        return res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addCategory,
};