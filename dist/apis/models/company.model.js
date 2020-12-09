"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCompany = exports.Company = void 0;
/**
 * companyName, address, companyLogo, workSpacePhotos, industry, description, title
 */
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Company extends sequelize_1.Model {
}
exports.Company = Company;
const initCompany = () => {
    Company.init({
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
        logo: {
            type: sequelize_1.DataTypes.STRING,
        },
        title: {
            type: sequelize_1.DataTypes.TEXT,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
        },
        industryId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
    }, {
        // underscored: true,
        tableName: 'company',
        sequelize: config_1.database,
    });
    Company.sync({ force: false }).then(() => console.log('user profile table created'));
};
exports.initCompany = initCompany;
