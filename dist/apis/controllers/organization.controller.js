"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const models_1 = require("../models");
class OrganizationController {
    getAll() {
        return models_1.Organization.findAll({});
    }
    getById(id) {
        return models_1.Organization.findByPk(id);
    }
    create(user) {
        return models_1.Organization.create(user);
    }
    removeOrganization(id) {
        return models_1.Organization.destroy({ where: { id } });
    }
    update(org, id) {
        return models_1.Organization.update(org, { where: { id } });
    }
}
exports.OrganizationController = OrganizationController;
