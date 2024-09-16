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
        type: DataTypes.TEXT,
        allowNull: false
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_fav: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Mobil