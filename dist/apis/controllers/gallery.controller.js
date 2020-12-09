"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const models_1 = require("../models");
class GalleryController {
    getAll() {
        return models_1.Gallery.findAll({ raw: true });
    }
    getAllByCompany(id) {
        return models_1.Gallery.findAll({ where: { companyId: id } });
    }
    getById(id) {
        return models_1.Gallery.findByPk(id);
    }
    create(role) {
        return models_1.Gallery.create(role);
    }
    removeOne(id, companyID) {
        return models_1.Gallery.destroy({ where: { id, companyId: companyID } });
    }
}
exports.GalleryController = GalleryController;
