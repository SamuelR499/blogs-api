const { Category } = require('../models');
const errorGenerate = require('../utils/genericErrorHanlder');
const { createCategorySchema } = require('../utils/schemas');

const addCategory = async (category) => {
    const { error } = createCategorySchema.validate(category);

    if (error) throw errorGenerate(400, error.message);

    const newCategory = await Category.create(category);
    return newCategory.dataValues;
};

const getCategories = async () => {
    const categories = await Category.findAll({
        attributes: ['id', 'name'],
    });
    return categories;
};

module.exports = {
    addCategory,
    getCategories,
};