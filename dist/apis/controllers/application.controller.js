"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationController = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
class JobApplicationController {
    findAll() {
        return models_1.JobApplication.findAll({});
    }
    getById(id) {
        return models_1.JobApplication.findByPk(id);
    }
    create(jobapplication) {
        return models_1.JobApplication.create(jobapplication);
    }
    findByJobId(id) {
        return models_1.JobApplication.findOne({ where: { companyId: id } });
    }
    findByUserId(id) {
        return models_1.JobApplication.findOne({ where: { companyId: id } });
    }
    updateJobApplication(jobapplication, id) {
        return models_1.JobApplication.update(jobapplication, { where: { id } });
    }
    removeOne(id) {
        return models_1.JobApplication.destroy({ where: { id } });
    }
    acceptJobApplication(jobapplication, id) {
        return models_1.JobApplication.update(jobapplication, { where: { id } });
    }
    rejectJobApplication(jobapplication, id) {
        return models_1.JobApplication.update(jobapplication, { where: { id } });
    }
    cancelJobApplication(jobapplication, id) {
        return models_1.JobApplication.update(jobapplication, { where: { id } });
    }
    getJobsByHour(hours) {
        return models_1.JobApplication.findAll({
            where: {
                'createdAt': {
                    $gt: sequelize_1.Sequelize.fn('DATE_SUB', sequelize_1.Sequelize.literal('NOW()'), sequelize_1.Sequelize.literal(`INTERVAL ${hours} HOUR`)),
                },
            },
        });
    }
}
exports.JobApplicationController = JobApplicationController;
