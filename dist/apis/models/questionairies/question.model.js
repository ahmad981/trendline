"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initQuestions = exports.Question = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class Question extends sequelize_1.Model {
}
exports.Question = Question;
const initQuestions = () => {
    Question.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        question: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'question',
        sequelize: config_1.database,
    });
    Question.sync({ force: false }).then(() => console.log('Question table created'));
};
exports.initQuestions = initQuestions;
