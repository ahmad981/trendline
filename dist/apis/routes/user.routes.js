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
/* eslint-disable @typescript-eslint/no-explicit-any */
const express = require("express");
const bcrypt = require("bcryptjs");
const http_status_1 = require("http-status");
const controllers_1 = require("../controllers");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const middlewares_1 = require("../../middlewares");
const config_1 = require("../../config");
const validateOrganization_1 = require("../../utils/validations/validateOrganization");
const verificationLink = `${config_1.baseUrl}/user/email/verify?hash=`;
const userController = new controllers_1.UserController();
const router = express.Router();
/**
 * TODO: add authorization middleware.
 * @description only admin can create new user with roles other user will sign up.
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    user.password = yield bcrypt.hash(user.password, 10);
    userController
        .create(user)
        .then((doc) => {
        res.json({ data: doc, message: 'admin created successfully' });
    })
        .catch((error) => res.status(500).json({ message: error.message }));
});
const empSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // validate name, email, password.
    try {
        const user = req.body;
        user.roleId = 2;
        user.password = yield bcrypt.hash(user.password, 10);
        user.hash = utils_1.generateHash(user.email);
        const response = (yield userController.create(user)).get({ plain: true });
        const role = enums_1.getCachedRole(Number(response.roleId));
        const token = utils_1.generateToken(response.id, role.name);
        process.nextTick(() => {
            utils_1.sendEmailVerification(response.name, verificationLink + user.hash, 'verify email', response.email);
        });
        return res.json({ data: { ID: response.id, name: response.name }, token });
    }
    catch (error) {
        return next(error);
    }
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // validate name, email, password.
    try {
        const user = req.body;
        user.password = yield bcrypt.hash(user.password, 10);
        user.hash = utils_1.generateHash(user.email);
        const response = (yield userController.create(user)).get({ plain: true });
        const role = enums_1.getCachedRole(Number(response.roleId));
        const token = utils_1.generateToken(response.id, role.name);
        process.nextTick(() => {
            utils_1.sendEmailVerification(response.name, verificationLink + user.hash, 'verify email', response.email);
        });
        return res.json({ data: { ID: response.id, name: response.name }, token });
    }
    catch (error) {
        return next(error);
    }
});
const login = (req, res, next) => {
    const { email, password } = req.body;
    userController
        .findByEmail(email)
        .then((user) => {
        if (utils_1.comparePassword(password, user.password)) {
            const role = enums_1.getCachedRole(user.roleId);
            return res.json({ data: { ID: user.id, name: user.name }, token: utils_1.generateToken(user.id, role.name) });
        }
        return res.status(http_status_1.UNAUTHORIZED).json({ message: 'Either email or password is incorrect' });
    })
        .catch((error) => { console.log(error); next(error); });
};
const resetPassword = (req, res) => {
    // empty line
    res.json({ message: 'not implemeted yet' });
};
const getAll = (req, res, next) => {
    userController.findAll().then((users) => {
        res.json({ data: users });
    })
        .catch(err => next(err));
};
const getAllCompanies = (req, res, next) => {
    userController.findAllCompanies().then((users) => {
        res.json({ data: users });
    })
        .catch(err => next(err));
};
const getAdmins = (req, res, next) => {
    userController.findAllAdmins().then((users) => {
        res.json({ data: users });
    })
        .catch(err => next(err));
};
const confirmEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userController.findByHash(`${req.query.hash}`);
        if (user) {
            yield userController.updateEmailStatus(true, user.id);
            return res.json({ message: enums_1.EMAIL_CONFIRM_MSG });
        }
        return next(new middlewares_1.HttpException(400, enums_1.BAD_REQ_MSG));
    }
    catch (error) {
        return next(error);
    }
});
// router.route('/').post([verifyToken, checkSuperAdmin], create);
router.route('/create/admin').post([middlewares_1.verifyToken, middlewares_1.checkSuperAdmin, validateOrganization_1.validateAdminCreation], create);
router.route('/get/admins').get([middlewares_1.verifyToken, middlewares_1.checkSuperAdmin], getAdmins);
router.route('/').get(getAll);
router.route('/signup').post(utils_1.validateUserSignup, signup);
router.route('/emp/signup').post(validateOrganization_1.validateEmpSignup, empSignup);
router.route('/login').post(middlewares_1.loginLimiter, login);
router.route('/email/verify').get(confirmEmail);
router.route('/reset/password').put(resetPassword);
router.route('/companies').get(getAllCompanies);
exports.default = router;
