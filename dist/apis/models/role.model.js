"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRole = exports.Role = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
const initRole = () => {
    Role.init({
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
        tableName: 'roles',
        sequelize: config_1.database,
    });
    Role.sync({ force: false });
};
exports.initRole = initRole;
