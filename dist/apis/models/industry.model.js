"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIndustry = exports.Industry = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Industry extends sequelize_1.Model {
}
exports.Industry = Industry;
const initIndustry = () => {
    Industry.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'industry',
        sequelize: config_1.database,
    });
    Industry.sync({ force: false }).then(() => console.log('Organization table created'));
};
exports.initIndustry = initIndustry;
