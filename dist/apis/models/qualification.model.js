"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initQualification = exports.Qualification = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Qualification extends sequelize_1.Model {
}
exports.Qualification = Qualification;
const initQualification = () => {
    Qualification.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'organization',
        sequelize: config_1.database,
    });
    Qualification.sync({ force: false }).then(() => console.log('Organization table created'));
};
exports.initQualification = initQualification;
