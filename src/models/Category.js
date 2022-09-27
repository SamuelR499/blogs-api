module.exports = (sequelize, DataTypes) => {
    const userModel = sequelize.define('Category', {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
          },
      },
      {
        timestamps: false,
        tableName: 'categories',
        underscored: true,
      });
  
    return userModel;
  };