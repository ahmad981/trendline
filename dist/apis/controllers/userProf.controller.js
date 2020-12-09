"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const models_1 = require("../models");
class UserProfileController {
    findAll() {
        return models_1.UserProfile.findAll({});
    }
    getUserProfileById(id) {
        return models_1.UserProfile.findByPk(id);
    }
    create(user) {
        return models_1.UserProfile.create(user);
    }
    findByuserId(id) {
        return models_1.UserProfile.findOne({ where: { userId: id } });
    }
    updateUserProfile(prof, id) {
        return models_1.UserProfile.update(prof, { where: { id } });
    }
    updateByUserID(prof, userID) {
        return models_1.UserProfile.update(prof, { where: { userId: userID } });
    }
}
exports.UserProfileController = UserProfileController;
