module.exports = (sequelize, DataTypes) => {
    const PostcategoryModel = sequelize.define('PostCategory', {
        postId: {
          type: DataTypes.INTEGER,
        },
        categoryId: {
            type: DataTypes.INTEGER,
          },
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      });
  
      PostcategoryModel.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blogposts',
            through: PostcategoryModel,
            foreignKey: 'category_id',
            otherKey: 'post_id',
        });
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostcategoryModel,
            foreignKey: 'post_id',
            otherKey: 'category_id',
        });
      }

    return PostcategoryModel;
  };