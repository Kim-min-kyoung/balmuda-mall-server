module.exports = function(sequelize, DataTypes) {
    const cart = sequelize.define('Cart', {
        product_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        }
    });
    return cart;
}