"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQuestionController = void 0;
const models_1 = require("../../models");
class JobQuestionController {
    addJobQuestion(questions) {
        return models_1.JobQuestions.create(questions);
    }
    addJobQuestions(questions) {
        return models_1.JobQuestions.bulkCreate(questions);
    }
    updateJobQuestion(id, questions) {
        return models_1.JobQuestions.update(questions, { where: { id } });
    }
    removeJobQuestion(id) {
        return models_1.JobQuestions.destroy({ where: { id } });
    }
    removeQuestionsByJob(id) {
        return models_1.JobQuestions.destroy({ where: { jobId: id } });
    }
}
exports.JobQuestionController = JobQuestionController;
