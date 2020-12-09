"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
class SkillController {
    search(skill) {
        return models_1.Skill.findOne({ where: { name: skill } });
    }
    getSkills() {
        return models_1.Skill.findAll({ raw: true });
    }
    getSkillById(id) {
        return models_1.Skill.findByPk(id);
    }
    create(skill) {
        return models_1.Skill.create(skill);
    }
    removeSkill(id) {
        return models_1.Skill.destroy({ where: { id } });
    }
    updateSkill(id, skill) {
        return models_1.Skill.update(skill, { where: { id } });
    }
    searchFullText(text) {
        return models_1.Skill.findAll({
            where: sequelize_1.Sequelize.literal('MATCH (name) AGAINST (:name)'),
            replacements: { name: text },
        });
    }
    /** in progress */
    searchSkill(query) {
        return models_1.Skill.findAll({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${query}%`,
                },
            },
            limit: 10,
        });
    }
}
exports.SkillController = SkillController;
// return Skill.findAll({
//     where: Sequelize.literal('MATCH (SomeField) AGAINST (:name)'),
//     replacements: {
//         name: 'Alex'
//     }
// })
