"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const jobPhoto_controller_1 = require("./jobPhoto.controller");
const jobSkill_controller_1 = require("./jobSkill.controller");
const jobQuestion_controller_1 = require("./jobQuestion.controller");
const jobStartDate_controller_1 = require("./jobStartDate.controller");
class JobController {
    getById(id) {
        return models_1.Job.findOne({
            where: { id },
            include: [
                {
                    model: models_1.JobPhotos,
                    as: 'photos',
                    attributes: {
                        exclude: ['jobId', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: models_1.JobQuestions,
                    as: 'questions',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                }, {
                    model: models_1.JobSkill,
                    as: 'skills',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                }, {
                    model: models_1.JobStartDate,
                    as: 'startDates',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                },
            ],
        });
    }
    getByCompany(id) {
        return models_1.Job.findAll({
            where: { companyId: id },
            include: [
                {
                    model: models_1.JobPhotos,
                    as: 'photos',
                    attributes: {
                        exclude: ['jobId', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: models_1.JobQuestions,
                    as: 'questions',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                }, {
                    model: models_1.JobSkill,
                    as: 'skills',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                }, {
                    model: models_1.JobStartDate,
                    as: 'startDates',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                },
            ],
        });
    }
    getAll() {
        return models_1.Job.findAll({
            where: {},
            include: [
                {
                    model: models_1.JobPhotos,
                    as: 'photos',
                    attributes: {
                        exclude: ['jobId', 'createdAt', 'updatedAt'],
                    },
                },
                {
                    model: models_1.JobQuestions,
                    as: 'questions',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                }, {
                    model: models_1.JobSkill,
                    as: 'skills',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                }, {
                    model: models_1.JobStartDate,
                    as: 'startDates',
                    attributes: {
                        exclude: [
                            'jobId',
                            'createdAt',
                            'updatedAt',
                        ],
                    },
                },
            ],
        });
    }
    create(job) {
        return models_1.Job.create(job);
    }
    removeJob(id) {
        return models_1.Job.destroy({ where: { id } });
    }
    update(org, id) {
        return models_1.Job.update(org, { where: { id } });
    }
    removeQuestionsByJob(id) {
        return models_1.JobQuestions.destroy({ where: { jobId: id } });
    }
    searchJobs(keywords) {
        return models_1.Job.findAll({
            where: sequelize_1.Sequelize.literal('MATCH (title, description) AGAINST (:search)'),
            replacements: { search: keywords },
        });
    }
    /**
      *
      * params {
      *      search: string,
      *      trDuration: number[],
      *      trainingType: string[],
      *      lat: number,
      *      lng: number,
      *      radius: number,
      *      sort: string,
      *      hourlyRate: {min:number, max: number},
      *      stDates: string[] //start dates array
      * }
      *
      * @description : filter on the base of parameters
      */
    searchNearJob(ids = [], keywords = '', lng = 0, lat = 0, radius = 10) {
        let query = '';
        if (lat > 0 && lng > 0) {
            query += ` ( ST_Distance_Sphere(geoLocation, POINT(${lng}, ${lat})) < ${radius * 1000} ) AND`;
        }
        console.log('----- query -------');
        console.log(query, ', ', keywords);
        console.log('----- query -------');
        return models_1.Job.findAll({
            where: sequelize_1.Sequelize.literal(`${query} createdAt < date_sub(now(), INTERVAL 5 day) AND  (MATCH (title, description) AGAINST (:search) OR id IN (:skills))`),
            replacements: { search: keywords, skills: ids },
            logging: false,
        });
    }
    /**
      *
      * params {
      *      search: string,
      *      trDuration: number[],
      *      trainingType: string[],
      *      lat: number,
      *      lng: number,
      *      radius: number,
      *      sort: string,
      *      hourlyRate: {min:number, max: number},
      *      stDates: string[] //start dates array
      * }
      *
      * @description : filter on the base of parameters
      */
    filterJob(ids = [], keywords, lng = 0, lat = 0, trType = [], trDuration = [], radius = 10, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sort = '', hourlyRateMin = 0, hourlyRateMax = 0, stdates = []) {
        let query = '';
        if (hourlyRateMax > 0) {
            query += ` hourlyRate >= ${hourlyRateMin} AND hourlyRate <= ${hourlyRateMax} `;
        }
        if (stdates.length > 0) {
            query += ` AND id IN (${stdates}) `;
        }
        if (trDuration.length > 0) {
            query += `AND trDuration IN (${trDuration}) `;
        }
        if (trType.length > 0) {
            query += ` AND trainingType IN (${trType}) `;
        }
        if (lat > 0 && lng > 0) {
            query += ` AND ( ST_Distance_Sphere(geoLocation, POINT(${lng}, ${lat})) < ${radius * 1000} ) `;
        }
        return models_1.Job.findAll({
            where: sequelize_1.Sequelize.literal(`${query} AND createdAt < date_sub(now(), INTERVAL 5 day) AND  (MATCH (title, description) AGAINST (:search) OR id IN (:skills))`),
            replacements: { search: keywords, skills: ids },
            logging: false,
        });
    }
}
exports.JobController = JobController;
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
applyMixins(JobController, [jobPhoto_controller_1.JobPhotoController, jobSkill_controller_1.JobSkillController, jobStartDate_controller_1.JobStartDateController, jobQuestion_controller_1.JobQuestionController]);
