"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJobStartDate = exports.JobStartDate = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class JobStartDate extends sequelize_1.Model {
}
exports.JobStartDate = JobStartDate;
const initJobStartDate = () => {
    JobStartDate.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        jobId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: sequelize_1.DataTypes.TIME,
        },
    }, {
        // underscored: true,
        tableName: 'jobStartDate',
        sequelize: config_1.database,
    });
    JobStartDate.sync({ force: false }).then(() => console.log('Organization table created'));
};
exports.initJobStartDate = initJobStartDate;
