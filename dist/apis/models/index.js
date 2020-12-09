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
exports.initModels = void 0;
const role_model_1 = require("./role.model");
const user_model_1 = require("./user.model");
const userProfile_model_1 = require("./userProfile.model");
const organization_model_1 = require("./organization.model");
const industry_model_1 = require("./industry.model");
const company_model_1 = require("./company.model");
const address_model_1 = require("./address.model");
const gallery_model_1 = require("./gallery.model");
const skills_model_1 = require("./skills.model");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const seed_1 = require("../../utils/seed");
const job_1 = require("./job");
const questionairies_1 = require("./questionairies");
const jobApplication_model_1 = require("./jobApplication.model");
__exportStar(require("./user.model"), exports);
__exportStar(require("./organization.model"), exports);
__exportStar(require("./role.model"), exports);
__exportStar(require("./industry.model"), exports);
__exportStar(require("./qualification.model"), exports);
__exportStar(require("./userProfile.model"), exports);
__exportStar(require("./company.model"), exports);
__exportStar(require("./address.model"), exports);
__exportStar(require("./gallery.model"), exports);
__exportStar(require("./job"), exports);
__exportStar(require("./skills.model"), exports);
__exportStar(require("./questionairies"), exports);
__exportStar(require("./jobApplication.model"), exports);
exports.initModels = () => __awaiter(void 0, void 0, void 0, function* () {
    yield role_model_1.initRole();
    yield user_model_1.initUser();
    yield utils_1.makeRolesSeed();
    yield seed_1.seedSuperAdmin();
    enums_1.setUpCachedRoles();
    yield organization_model_1.initOrganization();
    yield industry_model_1.initIndustry();
    yield userProfile_model_1.initUserProfile();
    yield company_model_1.initCompany();
    yield address_model_1.initAddress();
    yield gallery_model_1.initGallery();
    yield job_1.initJob();
    yield skills_model_1.initSkill();
    yield questionairies_1.initQuestionaries();
    yield jobApplication_model_1.initJobApplication();
    yield user_model_1.User.belongsTo(role_model_1.Role, { foreignKey: 'roleId', as: 'role' });
    yield user_model_1.User.belongsTo(organization_model_1.Organization, { foreignKey: 'organizationId', as: 'organization' });
    yield userProfile_model_1.UserProfile.belongsTo(user_model_1.User, { foreignKey: 'userId', as: 'profile' });
    yield user_model_1.User.hasOne(userProfile_model_1.UserProfile, { foreignKey: 'userId', as: 'profile' });
    yield user_model_1.User.hasOne(company_model_1.Company, { foreignKey: 'userId', as: 'company' });
    yield company_model_1.Company.hasOne(address_model_1.Address, { foreignKey: 'companyId', as: 'address' });
    yield company_model_1.Company.belongsTo(industry_model_1.Industry, { foreignKey: 'industryId', as: 'industry' });
    yield company_model_1.Company.hasMany(gallery_model_1.Gallery, { foreignKey: 'companyId', as: 'gallery' });
    // await Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
    yield job_1.Job.belongsTo(company_model_1.Company, { foreignKey: 'companyId', as: 'jobs' });
    yield questionairies_1.Question.hasMany(questionairies_1.Option, { foreignKey: 'questionId', as: 'options' });
    yield jobApplication_model_1.JobApplication.belongsTo(job_1.Job, { foreignKey: 'jobId', as: 'applications' });
    yield utils_1.makeRolesSeed();
    yield seed_1.seedSuperAdmin();
    enums_1.setUpCachedRoles();
});
exports.initModels();
// if (process.env.NODE_ENV !== 'testing') {
//   initModels();
// }
