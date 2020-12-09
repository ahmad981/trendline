"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const models_1 = require("../models");
class AddressController {
    findAll() {
        return models_1.Address.findAll({});
    }
    getAddressById(id) {
        return models_1.Address.findByPk(id);
    }
    create(address) {
        return models_1.Address.create(address);
    }
    findByCompanyId(id) {
        return models_1.Address.findOne({ where: { companyId: id } });
    }
    updateAddress(address, id) {
        return models_1.Address.update(address, { where: { id } });
    }
    updateByCompanyId(address, cid) {
        return models_1.Address.update(address, { where: { companyId: cid } });
    }
}
exports.AddressController = AddressController;
