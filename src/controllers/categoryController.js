const categoryService = require('../services/categoryService');

const addCategory = async (req, res, next) => {
    try {
        const newCategory = await categoryService.addCategory(req.body);
        return res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

const getCategories = async (_req, res, next) => {
    try {
        const categories = await categoryService.getCategories();
    
        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addCategory,
    getCategories,
};