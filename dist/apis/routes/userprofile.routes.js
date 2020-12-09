"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_status_1 = require("http-status");
const middlewares_1 = require("../../middlewares");
const utils_1 = require("../../utils");
const controllers_1 = require("../controllers");
const enums_1 = require("../../enums");
const router = express.Router();
const userProfileController = new controllers_1.UserProfileController();
const create = (req, res, next) => {
    const profile = req.body;
    profile.userId = req.user.ID;
    userProfileController
        .create(profile).then((prof) => {
        res.json({ data: prof, message: enums_1.USER_PROF_CREATED });
    })
        .catch(error => next(error));
};
const update = (req, res, next) => {
    const profile = req.body;
    const { ID } = req.user;
    userProfileController
        .updateByUserID(profile, ID).then((orgs) => {
        if (orgs[0] > 0) {
            return res.json({ message: 'profile updated successfully' });
        }
        return res.status(http_status_1.UNPROCESSABLE_ENTITY).json({ message: enums_1.UNPROCESSABLE_CONTENT });
    })
        .catch(error => next(error));
};
router.route('/').post(middlewares_1.verifyToken, middlewares_1.checkApplicant, utils_1.validateUserProfile, create);
router.route('/update').put([middlewares_1.verifyToken, utils_1.validateUserProfile], update);
exports.default = router;
