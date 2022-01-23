module.exports = function(sequelize, DataTypes) {
    const about = sequelize.define('About', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: true
        }
    });
    return about;
}