"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.getCachedRole = exports.setUpCachedRoles = exports.ROLES = exports.UNPROCESSABLE_CONTENT = exports.COMPANY_CREATED = exports.USER_PROF_CREATED = exports.BAD_REQ_MSG = exports.EMAIL_CONFIRM_MSG = exports.ERR_FORBIDDEN = exports.ERR_ACCCESS_DENIED = exports.VALIDATION_ERROR_STATUS = void 0;
const controllers_1 = require("../apis/controllers");
const roleController = new controllers_1.RoleController();
let roles = [];
__exportStar(require("./pagination.interface"), exports);
__exportStar(require("./trTypes"), exports);
__exportStar(require("./trdurations"), exports);
exports.VALIDATION_ERROR_STATUS = 422;
exports.ERR_ACCCESS_DENIED = 'Access denied.';
exports.ERR_FORBIDDEN = 'Forbidden';
exports.EMAIL_CONFIRM_MSG = 'Your email confirmed successfully!';
exports.BAD_REQ_MSG = 'Bad request';
exports.USER_PROF_CREATED = 'Profile Created Successfully';
exports.COMPANY_CREATED = 'Company profile created successfully';
exports.UNPROCESSABLE_CONTENT = 'Unprocessable content';
exports.ROLES = roles;
exports.setUpCachedRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        roles = yield roleController.getRoles();
    }
    catch (error) {
        console.log('cached error : ', error);
    }
});
exports.getCachedRole = (id) => {
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].id === id) {
            return roles[i];
        }
    }
    return null;
};
