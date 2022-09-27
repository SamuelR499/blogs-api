module.exports = (sequelize, DataTypes) => {
    const BlogPostModel = sequelize.define('BlogPost', {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
          },
        content: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        published: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updated: {
            allowNull:false,
            type: DataTypes.DATE
          }
      },
      {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
      });
      
      BlogPostModel.associate = (models) => {
        BlogPostModel.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
      };
  
    return BlogPostModel;
  };