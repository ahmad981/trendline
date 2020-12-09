"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryController = void 0;
const models_1 = require("../models");
class IndustryController {
    getAll() {
        return models_1.Industry.findAll({ raw: true });
    }
    getById(id) {
        return models_1.Industry.findByPk(id);
    }
    create(role) {
        return models_1.Industry.create(role);
    }
    removeOne(id) {
        return models_1.Industry.destroy({ where: { id } });
    }
    updateOne(industry, id) {
        return models_1.Industry.update(industry, { where: { id } });
    }
}
exports.IndustryController = IndustryController;
