module.exports = function(sequelize, DataTypes) {
    const product = sequelize.define('Recipe', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: true
        }
    });
    return product;
}