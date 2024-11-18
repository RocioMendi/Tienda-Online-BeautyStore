// models/Order.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente'
      },
      direccionEnvio: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'orders', // Define el nombre de la tabla en la base de datos
      timestamps: true // Si tienes los campos `createdAt` y `updatedAt` en la tabla
    });
  
    Order.associate = (models) => {
      // Relación con User
      Order.belongsTo(models.User, { foreignKey: 'userId' });
  
      // Relación con Product (muchos a muchos)
      Order.belongsToMany(models.Product, { through: 'OrderProducts' });
    };
  
    return Order;
  };
  