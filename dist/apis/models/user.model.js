"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class User extends sequelize_1.Model {
}
exports.User = User;
const initUser = () => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        roleId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        organizationId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        hash: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
        isEmailVerified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        // underscored: true,
        tableName: 'users',
        sequelize: config_1.database,
    });
    User.sync({ force: false }).then(() => console.log('Todo table created'));
};
exports.initUser = initUser;
