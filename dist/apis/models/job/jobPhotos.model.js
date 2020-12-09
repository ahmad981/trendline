"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJobPhotos = exports.JobPhotos = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class JobPhotos extends sequelize_1.Model {
}
exports.JobPhotos = JobPhotos;
const initJobPhotos = () => {
    JobPhotos.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        jobId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        image: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'jobPhotos',
        sequelize: config_1.database,
    });
    JobPhotos.sync({ force: false }).then(() => console.log('JobSkill table created'));
};
exports.initJobPhotos = initJobPhotos;
