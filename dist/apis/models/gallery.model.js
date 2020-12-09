"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGallery = exports.Gallery = void 0;
// lib/models/node.model.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
class Gallery extends sequelize_1.Model {
}
exports.Gallery = Gallery;
const initGallery = () => {
    Gallery.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        companyId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        // underscored: true,
        tableName: 'gallery',
        sequelize: config_1.database,
    });
    Gallery.sync({ force: false }).then(() => console.log('Organization table created'));
};
exports.initGallery = initGallery;
