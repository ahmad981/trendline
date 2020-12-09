"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJobApplication = exports.JobApplication = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class JobApplication extends sequelize_1.Model {
}
exports.JobApplication = JobApplication;
const initJobApplication = () => {
    JobApplication.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        resume: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        jobId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        startDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        // underscored: true,
        tableName: 'application',
        sequelize: config_1.database,
    });
    JobApplication.sync({ force: false }).then(() => console.log('Organization table created'));
};
exports.initJobApplication = initJobApplication;
