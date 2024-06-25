const {
    DataTypes
} = require("sequelize");
const db = require("../../config/database");

const CarType = db.define('car_type', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = CarType