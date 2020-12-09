"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAddress = exports.Address = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Address extends sequelize_1.Model {
}
exports.Address = Address;
const initAddress = () => {
    Address.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        companyId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            unique: true,
        },
        line1: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        line2: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        city: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        state: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        zipcode: {
            type: new sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        lat: {
            type: new sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        lng: {
            type: new sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'address',
        sequelize: config_1.database,
    });
    Address.sync({ force: false }).then(() => console.log('Address table created'));
};
exports.initAddress = initAddress;
