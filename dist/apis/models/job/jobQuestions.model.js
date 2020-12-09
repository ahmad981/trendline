"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJobQuestions = exports.JobQuestions = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class JobQuestions extends sequelize_1.Model {
}
exports.JobQuestions = JobQuestions;
const initJobQuestions = () => {
    JobQuestions.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        jobId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        question: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        answer: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'jobQuiz',
        sequelize: config_1.database,
    });
    JobQuestions.sync({ force: false }).then(() => console.log('JobQuestions table created'));
};
exports.initJobQuestions = initJobQuestions;
