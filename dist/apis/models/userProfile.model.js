"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserProfile = exports.UserProfile = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class UserProfile extends sequelize_1.Model {
}
exports.UserProfile = UserProfile;
const initUserProfile = () => {
    UserProfile.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
        },
        education: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        age: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        gender: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        gradComDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        anIncome: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        phone: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        address: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
        linkedIn: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
        empStatus: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'userProfiles',
        sequelize: config_1.database,
    });
    UserProfile.sync({ force: false }).then(() => console.log('user profile table created'));
};
exports.initUserProfile = initUserProfile;
