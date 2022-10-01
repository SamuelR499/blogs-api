module.exports = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define(
    'BlogPost',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'blog_posts',
      underscored: true
    }
  );

  BlogPostModel.associate = models => {
    BlogPostModel.belongsTo(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return BlogPostModel;
};
