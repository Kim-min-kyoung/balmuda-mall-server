module.exports = function(sequelize, DataTypes) {
    const product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        subname: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        group: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        product_description: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    });
    return product;
}