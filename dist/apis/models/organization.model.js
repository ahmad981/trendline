"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOrganization = exports.Organization = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Organization extends sequelize_1.Model {
}
exports.Organization = Organization;
const initOrganization = () => {
    Organization.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        domain: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
            unique: true,
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
    Organization.sync({ force: false }).then(() => console.log('Organization table created'));
};
exports.initOrganization = initOrganization;
