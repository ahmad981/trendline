"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionController = void 0;
const models_1 = require("../../models");
class OptionController {
    updateOption(opt, id) {
        return models_1.Option.update(opt, { where: { id } });
    }
    createOptions(options) {
        return models_1.Option.bulkCreate(options);
    }
    createOneOption(option) {
        return models_1.Option.create(option);
    }
    getOptionsByQuestionId(id) {
        return models_1.Option.findAll({ where: { questionId: id } });
    }
    removeOption(id) {
        return models_1.Option.destroy({ where: { id } });
    }
    removeOptionsByQuestionId(id) {
        return models_1.Option.destroy({ where: { questionId: id } });
    }
}
exports.OptionController = OptionController;
