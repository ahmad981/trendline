"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
class UserController {
    findAll() {
        return models_1.User.findAll({ where: { roleId: 1 }, include: [{ model: models_1.Organization, as: 'organization' }, { model: models_1.Role, as: 'role' }, { model: models_1.UserProfile, as: 'profile' }] });
    }
    findAllAdmins() {
        const excl = ['updatedAt', 'password', 'organizationId', 'hash', 'isEmailVerified'];
        return models_1.User.findAll({ where: { roleId: 3 }, attributes: { exclude: excl }, include: [{ model: models_1.Role, as: 'role' }] });
    }
    findAllCompanies() {
        const exUser = ['roleId', 'organizationId', 'industryId', 'password', 'hash', 'isEmailVerified', 'createdAt', 'updatedAt'];
        const exCompany = ['userId', 'createdAt', 'updatedAt'];
        const exIndustry = ['createdAt', 'updatedAt'];
        const exAddress = ['companyId', 'createdAt', 'updatedAt'];
        return models_1.User.findAll({
            where: { roleId: 2 },
            attributes: { exclude: exUser },
            include: [
                {
                    model: models_1.Company, as: 'company', attributes: { exclude: exCompany },
                    include: [
                        {
                            model: models_1.Gallery, as: 'gallery',
                        },
                        {
                            model: models_1.Industry, as: 'industry', attributes: { exclude: exIndustry },
                        },
                        {
                            model: models_1.Address, as: 'address', attributes: { exclude: exAddress },
                        }
                    ],
                }
            ],
        });
    }
    getTodoById(id) {
        return models_1.User.findByPk(id);
    }
    create(user) {
        return models_1.User.create(user);
    }
    findByEmail(email) {
        return models_1.User.findOne({ where: { email }, raw: true });
    }
    findByHash(hash) {
        return models_1.User.findOne({ where: { hash }, raw: true });
    }
    updateEmailStatus(val, id) {
        return models_1.User.update({ isEmailVerified: val }, { where: { id } });
    }
}
exports.UserController = UserController;
