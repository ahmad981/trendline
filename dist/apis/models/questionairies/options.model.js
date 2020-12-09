"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOptions = exports.Option = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../config");
class Option extends sequelize_1.Model {
}
exports.Option = Option;
const initOptions = () => {
    Option.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        questionId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        option: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'options',
        sequelize: config_1.database,
    });
    Option.sync({ force: false }).then(() => console.log('Question table created'));
};
exports.initOptions = initOptions;
