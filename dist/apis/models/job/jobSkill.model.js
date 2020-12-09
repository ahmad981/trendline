"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJobSkills = exports.JobSkill = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class JobSkill extends sequelize_1.Model {
}
exports.JobSkill = JobSkill;
const initJobSkills = () => {
    JobSkill.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        jobId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        skill: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'jobSkill',
        sequelize: config_1.database,
        indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['skill'] }],
    });
    JobSkill.sync({ force: false }).then(() => console.log('JobSkill table created'));
};
exports.initJobSkills = initJobSkills;
