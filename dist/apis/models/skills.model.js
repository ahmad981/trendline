"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSkill = exports.Skill = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Skill extends sequelize_1.Model {
}
exports.Skill = Skill;
const initSkill = () => {
    Skill.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'skills',
        sequelize: config_1.database,
        indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['name'] }],
    });
    Skill.sync({ force: false });
};
exports.initSkill = initSkill;
