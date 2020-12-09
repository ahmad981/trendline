"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const models_1 = require("../models");
class CompanyController {
    findAll() {
        return models_1.Company.findAll({});
    }
    getCompanyById(id) {
        return models_1.Company.findByPk(id);
    }
    create(user) {
        return models_1.Company.create(user);
    }
    findByuserId(id) {
        return models_1.Company.findOne({ where: { userId: id }, include: { model: models_1.Address, as: 'address' } });
    }
    updateCompany(prof, id) {
        return models_1.Company.update(prof, { where: { id } });
    }
    updateByUserID(prof, userID) {
        return models_1.Company.update(prof, { where: { userId: userID } });
    }
}
exports.CompanyController = CompanyController;
