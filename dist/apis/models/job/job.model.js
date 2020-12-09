"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.Job = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class Job extends sequelize_1.Model {
}
exports.Job = Job;
const init = () => {
    Job.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        companyId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        trainingType: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        trDescription: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        trDuration: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        noOfOpenings: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        isPaid: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        hourlyRate: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        },
        geoLocation: {
            type: sequelize_1.DataTypes.GEOMETRY('POINT', 4326),
        },
    }, {
        // underscored: true,
        tableName: 'jobs',
        sequelize: config_1.database,
        indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['title', 'description'] }],
    });
    Job.sync({ force: false })
        .then(() => console.log('Jobs table created'))
        .catch(error => console.log(error));
};
exports.init = init;
