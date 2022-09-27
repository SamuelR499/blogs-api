module.exports = (sequelize, DataTypes) => {
    const userModel = sequelize.define('User', {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        displayName: {
            allowNull: false,
            type: DataTypes.STRING,
          },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        image: {
            allowNull: false,
            type: DataTypes.STRING,
          }
      },
      {
        timestamps: false,
        tableName: 'users',
        underscored: true,
      });
  
      userModel.associate = (models) => {
        userModel.hasMany(models.BlogPost,{
          as: 'blogPosts',
          foreignKey: 'id'
        })
      }

    return userModel;
  };
