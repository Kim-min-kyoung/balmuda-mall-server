module.exports = function(sequelize, DataTypes) {
    const notice = sequelize.define('Notice', {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    });
    return notice;
}