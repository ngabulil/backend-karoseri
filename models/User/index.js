const {
    DataTypes
} = require("sequelize");
const db = require("../../config/database");

const User = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = User