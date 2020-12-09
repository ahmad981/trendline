"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const models_1 = require("../models");
class RoleController {
    getRoles() {
        return models_1.Role.findAll({ raw: true });
    }
    getRoleById(id) {
        return models_1.Role.findByPk(id);
    }
    create(role) {
        return models_1.Role.create(role);
    }
    removeRole(id) {
        return models_1.Role.destroy({ where: { id } });
    }
}
exports.RoleController = RoleController;
