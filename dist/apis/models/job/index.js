"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJob = void 0;
const job_model_1 = require("./job.model");
const jobPhotos_model_1 = require("./jobPhotos.model");
const jobQuestions_model_1 = require("./jobQuestions.model");
const jobSkill_model_1 = require("./jobSkill.model");
const jobStartDates_model_1 = require("./jobStartDates.model");
__exportStar(require("./job.model"), exports);
__exportStar(require("./jobPhotos.model"), exports);
__exportStar(require("./jobQuestions.model"), exports);
__exportStar(require("./jobSkill.model"), exports);
__exportStar(require("./jobStartDates.model"), exports);
exports.initJob = () => __awaiter(void 0, void 0, void 0, function* () {
    yield job_model_1.init();
    yield jobPhotos_model_1.initJobPhotos();
    yield jobQuestions_model_1.initJobQuestions();
    yield jobSkill_model_1.initJobSkills();
    yield jobStartDates_model_1.initJobStartDate();
    job_model_1.Job.hasMany(jobPhotos_model_1.JobPhotos, { foreignKey: 'jobId', as: 'photos' });
    job_model_1.Job.hasMany(jobStartDates_model_1.JobStartDate, { foreignKey: 'jobId', as: 'startDates' });
    job_model_1.Job.hasMany(jobQuestions_model_1.JobQuestions, { foreignKey: 'jobId', as: 'questions' });
    job_model_1.Job.hasMany(jobSkill_model_1.JobSkill, { foreignKey: 'jobId', as: 'skills' });
});
