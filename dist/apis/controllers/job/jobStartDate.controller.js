"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobStartDateController = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
class JobStartDateController {
    /**
       * @param keywords {}
       * @description : make full text search and return distinct jobids
       */
    searchByStartDates(dates) {
        return models_1.JobStartDate.findAll({
            attributes: [
                [sequelize_1.Sequelize.fn('DISTINCT', sequelize_1.Sequelize.col('jobId')), 'jobIDS'],
            ],
            where: sequelize_1.Sequelize.literal('date IN (:search)'),
            replacements: { search: dates },
            raw: true,
        });
    }
    removeJobStartDate(id) {
        return models_1.JobStartDate.destroy({ where: { id } });
    }
    addJobStartDates(startDates) {
        return models_1.JobStartDate.bulkCreate(startDates);
    }
    updateJobStartDate(id, startDate) {
        return models_1.JobStartDate.update(startDate, { where: { id } });
    }
    addJobSingleStartDate(startDate) {
        return models_1.JobStartDate.create(startDate);
    }
    removeStartDatesByJob(id) {
        return models_1.JobStartDate.destroy({ where: { jobId: id } });
    }
}
exports.JobStartDateController = JobStartDateController;
