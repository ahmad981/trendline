"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = exports.makeRolesSeed = void 0;
const bcrypt = require("bcryptjs");
const models_1 = require("../apis/models");
const seedRoles = [
    {
        'id': 1,
        'name': 'Applicant',
    },
    {
        'id': 2,
        'name': 'Employer',
    },
    {
        'id': 3,
        'name': 'Admin',
    },
    {
        'id': 4,
        'name': 'SuperAdmin',
    },
];
exports.makeRolesSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Role.destroy({ where: {} });
        yield models_1.Role.bulkCreate(seedRoles);
    }
    catch (error) {
        console.log('Seed Error : ', error);
    }
});
/**
 * remove all admins
 * add new admin
 */
exports.seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.User.destroy({ where: { roleId: 4 } });
        yield models_1.User.create({ email: 'shahkhalidsuperadmin@gmail.com', password: bcrypt.hashSync('123456', 10), roleId: 4, name: 'Shah Khalid' });
    }
    catch (error) {
        console.log('Super Admin Seed Error : ', error);
    }
});
