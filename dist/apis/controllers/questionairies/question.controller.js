"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const models_1 = require("../../models");
const options_controller_1 = require("./options.controller");
class QuestionController extends options_controller_1.OptionController {
    findAll() {
        return models_1.Question.findAll({
            where: {},
            include: {
                model: models_1.Option,
                as: 'options',
                attributes: { exclude: ['createdAt', 'questionId', 'updatedAt'] },
            },
        });
    }
    getQuestionById(id) {
        return models_1.Question.findOne({
            where: {
                id,
            },
            include: {
                model: models_1.Option,
                as: 'options',
                attributes: { exclude: ['createdAt', 'questionId', 'updatedAt'] },
            },
        });
    }
    create(question) {
        return models_1.Question.create(question);
    }
    updateQuestion(question, id) {
        return models_1.Question.update(question, { where: { id } });
    }
    getQuestionsByCategory(id) {
        return models_1.Question.findAll({
            where: { category: id },
            include: {
                model: models_1.Option,
                as: 'options',
                attributes: { exclude: ['createdAt', 'questionId', 'updatedAt'] },
            },
        });
    }
    removeQuestionsByCategory(id) {
        return models_1.Question.destroy({ where: { category: id } });
    }
    removeOne(id) {
        return models_1.Question.destroy({ where: { id } });
    }
}
exports.QuestionController = QuestionController;
