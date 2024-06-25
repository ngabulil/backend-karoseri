const {
    DataTypes
} = require("sequelize");
const CarType = require("../CarType");
const db = require("../../config/database");

const Mobil = db.define('cars', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    car_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    specification: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    spec_table: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Mobil