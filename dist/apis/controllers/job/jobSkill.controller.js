"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSkillController = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
class JobSkillController {
    addJobSkills(skills) {
        return models_1.JobSkill.bulkCreate(skills);
    }
    removeJobSkills(id) {
        return models_1.JobSkill.destroy({ where: { id } });
    }
    removeSkillsByJob(id) {
        return models_1.JobSkill.destroy({ where: { jobId: id } });
    }
    addJobOneSkill(skill) {
        return models_1.JobSkill.create(skill);
    }
    /**
       * @param keywords {}
       * @description : make full text search and return distinct jobids
       */
    searchJobSkills(keywords) {
        return models_1.JobSkill.findAll({
            attributes: [
                [sequelize_1.Sequelize.fn('DISTINCT', sequelize_1.Sequelize.col('jobId')), 'jobIDS'],
            ],
            where: sequelize_1.Sequelize.literal('MATCH (skill) AGAINST (:search)'),
            replacements: { search: keywords },
            raw: true,
        });
    }
}
exports.JobSkillController = JobSkillController;
