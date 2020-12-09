"use strict";
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
exports.create = exports.addSkills = void 0;
/* eslint-disable no-param-reassign */
const express = require("express");
const _ = require("lodash");
const middlewares_1 = require("../../../middlewares");
const utils_1 = require("../../../utils");
const controllers_1 = require("../../controllers");
const job_controller_1 = require("../../controllers/job/job.controller");
const skill_controller_1 = require("../../controllers/skill.controller");
const enums_1 = require("../../../enums");
const filterStopWords_1 = require("../../../utils/filterStopWords");
const router = express.Router();
const jobController = new job_controller_1.JobController();
const skillController = new skill_controller_1.SkillController();
const companyController = new controllers_1.CompanyController();
const trainingTypes = (req, res) => {
    res.json({ data: enums_1.trTypes, message: 'Found Training Types' });
};
const trainingDurationByType = (req, res) => {
    const durations = enums_1.getDurationByType(Number(req.params.ID));
    res.json({ data: durations, message: 'Found Durations' });
};
exports.addSkills = (jobID, skills) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(_.map(skills, (skill) => __awaiter(void 0, void 0, void 0, function* () {
        const doc = yield skillController.search(skill);
        if (!doc) {
            yield skillController.create({ name: skill });
        }
    })));
    const jobSkills = [];
    skills.forEach((element) => {
        const js = { jobId: jobID, skill: element };
        jobSkills.push(js);
    });
    return jobController.addJobSkills(jobSkills);
});
const addphotos = (photos, jobID) => {
    const jobPhotos = [];
    photos.forEach((photo) => {
        const jp = { jobId: jobID, image: photo };
        jobPhotos.push(jp);
    });
    return jobController.addJobPhotos(jobPhotos);
};
const addQuestions = (questions, jobID) => {
    questions.forEach((q) => {
        q.jobId = jobID;
    });
    return jobController.addJobQuestions(questions);
};
const addStartDates = (stds, jobID) => {
    stds.forEach((std) => {
        std.jobId = jobID;
    });
    return jobController.addJobStartDates(stds);
};
exports.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.attempts) {
        req.attempts++;
    }
    else {
        req.attempts = 1;
    }
    const job = req.body;
    const { ID } = req.user;
    let jobID = 0;
    let sk = 0;
    let jp = 0;
    let jq = 0;
    let jstd = 0;
    try {
        const company = (yield companyController.findByuserId(ID)).get();
        if (!company) {
            return res.status(403).json({ message: 'Please update company profile' });
        }
        job.companyId = company.id;
        const point = {
            type: 'Point',
            coordinates: [company.address.lng, company.address.lat],
        };
        job.geoLocation = point;
        const jobCreated = (yield jobController.create(job)).get();
        jobID = jobCreated.id;
        yield exports.addSkills(jobCreated.id, req.body.skills);
        sk = 1;
        yield addphotos(req.body.photos, jobID);
        jp = 1;
        yield addQuestions(req.body.questions, jobID);
        jq = 1;
        yield addStartDates(req.body.startDates, jobID);
        jstd = 1;
        const doc = yield jobController.getById(jobID);
        return res.json({ data: doc, message: 'job created successfully' });
    }
    catch (error) {
        if (jobID !== 0) {
            yield jobController.removeJob(jobID);
        }
        if (sk === 1) {
            yield jobController.removeSkillsByJob(jobID);
        }
        if (jp === 1) {
            yield jobController.removePhotosByJob(jobID);
        }
        if (jq === 1) {
            yield jobController.removeQuestionsByJob(jobID);
        }
        if (jstd === 1) {
            yield jobController.removeStartDatesByJob(jobID);
        }
        if (req.attempts <= 3) {
            exports.create(req, res, next);
        }
        return next(error);
    }
});
// eslint-disable-next-line consistent-return
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const job = req.body;
    const { ID } = req.user;
    try {
        const company = (yield companyController.findByuserId(ID)).get();
        if (!company) {
            return res.status(403).json({ message: 'Please update company profile' });
        }
        job.companyId = company.id;
        const point = {
            type: 'Point',
            coordinates: [company.address.lng, company.address.lat],
        };
        job.geoLocation = point;
        const doc = jobController.create(job);
        return res.json({ data: doc, message: 'Created Successfully' });
    }
    catch (error) {
        return next(error);
    }
});
const deleteJobStartDate = (req, res, next) => {
    const ID = Number(req.params.ID);
    jobController
        .removeJobStartDate(ID)
        .then((n) => {
        if (n > 0) {
            return res.json({ message: 'Start Date deleted successfully' });
        }
        return res
            .status(422)
            .json({ message: 'Item against this id does not exist' });
    })
        .catch((error) => {
        return next(error);
    });
};
const updateJobStartDate = (req, res, next) => {
    const jobStartDate = req.body;
    const ID = Number(req.params.ID);
    jobController
        .updateJobStartDate(ID, jobStartDate)
        .then((doc) => {
        if (doc[0] > 0) {
            return res.json({ message: 'Start Date updated successfully' });
        }
        return res
            .status(422)
            .json({ message: 'Item against this id does not exist' });
    })
        .catch((error) => next(error));
};
const addJobSingleStartDates = (req, res, next) => {
    const jobStartDate = req.body;
    jobStartDate.jobId = Number(req.query.jobID);
    jobController
        .addJobSingleStartDate(jobStartDate)
        .then((doc) => {
        res.json({ data: doc, message: 'Start Date Added successfully' });
    })
        .catch((error) => next(error));
};
const addJobStartDates = (req, res, next) => {
    const jobStartDates = req.body;
    for (let i = 0; i < jobStartDates.length; i++) {
        jobStartDates[i].jobId = Number(req.query.jobID);
    }
    jobController
        .addJobStartDates(jobStartDates)
        .then((docs) => {
        res.json({ data: docs, message: 'Start Dates Added successfully' });
    })
        .catch((error) => next(error));
};
const removeJobSkill = (req, res, next) => {
    const ID = Number(req.params.ID);
    jobController
        .removeJobSkills(ID)
        .then((n) => {
        if (n > 0) {
            res.json({ message: 'skill removed successfully' });
        }
        else {
            res.status(403).json({ message: 'item against id does not exist' });
        }
    })
        .catch((error) => next(error));
};
const addJobSkills = (req, res, next) => {
    const jobSkills = req.body;
    for (let i = 0; i < jobSkills.length; i++) {
        jobSkills[i].jobId = Number(req.query.jobID);
    }
    jobController
        .addJobSkills(jobSkills)
        .then((docs) => {
        res.json({ data: docs, message: 'Job Skills Added successfully' });
    })
        .catch((error) => next(error));
};
const addJobPhotos = (req, res, next) => {
    const jobPhotos = req.body;
    for (let i = 0; i < jobPhotos.length; i++) {
        jobPhotos[i].jobId = Number(req.query.jobID);
    }
    jobController
        .addJobPhotos(jobPhotos)
        .then((docs) => {
        res.json({ data: docs, message: 'Job Photos Added successfully' });
    })
        .catch((error) => next(error));
};
const removeJobQuestions = (req, res, next) => {
    const ID = Number(req.params.ID);
    jobController
        .removeJobQuestion(ID)
        .then((n) => {
        if (n > 0) {
            res.json({ message: 'Job Questions removed successfully' });
        }
        else {
            res.status(422).json({ message: 'item against id does not exist' });
        }
    })
        .catch((error) => next(error));
};
const addJobQuestions = (req, res, next) => {
    const jobquestion = req.body;
    jobquestion.jobId = Number(req.query.jobID);
    jobController
        .addJobQuestion(jobquestion)
        .then((docs) => {
        res.json({ data: docs, message: 'Job Questions Added successfully' });
    })
        .catch((error) => next(error));
};
const addOneSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobSkill = req.body;
    jobSkill.jobId = Number(req.query.jobID);
    const skills = yield skillController.searchFullText(jobSkill.skill);
    if (skills.length === 0) {
        yield skillController.create({ name: jobSkill.skill });
    }
    jobController
        .addJobOneSkill(jobSkill)
        .then((doc) => {
        res.json({ data: doc, message: 'Job Skill Added successfully' });
    })
        .catch((error) => next(error));
});
const getJobs = (req, res, next) => {
    jobController
        .getAll()
        .then((docs) => {
        return res.json({ data: docs, message: `${docs.length} jobs found` });
    })
        .catch((error) => next(error));
};
/**
 * @params : search {string}
 * @params lat {number}
 * @params lng {number}
 *
 */
const searchJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keywords = filterStopWords_1.filterStopwords(req.query.search.toString());
        const lat = Number(req.query.lat) || 0;
        const lng = Number(req.query.lng) || 0;
        let skills = yield jobController.searchJobSkills(keywords);
        console.log('-------------');
        console.log(skills, keywords);
        console.log('-------------');
        skills = utils_1.implode(skills, 'jobIDS');
        if (skills.length === 0) {
            // eslint-disable-next-line @typescript-eslint/quotes
            skills[0] = `'-1'`;
        }
        jobController
            .searchNearJob(skills, keywords, lng, lat, 10)
            .then((docs) => {
            res.json({ data: docs });
        })
            .catch((error) => res.json(error));
    }
    catch (error) {
        next(error);
    }
});
/**
 * params {
 *      search: string,
 *      trDuration: number[],
 *      trainingType: string[],
 *      lat: number,
 *      lng: number,
 *      radius: number,
 *      sort: string,
 *      hourlyRate: {min:number, max: number},
 * }
 */
const filterJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const keywords = filterStopWords_1.filterStopwords(req.body.search.toString());
    const lat = Number(req.body.geoLocation.lat || 0);
    const lng = Number(req.body.geoLocation.lng || 0);
    const hrmin = Number(req.body.hourlyRate.min);
    const hrmax = Number(req.body.hourlyRate.max);
    const radius = Number(req.body.radius || 10);
    const trType = utils_1.implode(req.body.trType || []);
    const trDuration = req.body.trDuration || [];
    let { startDates } = req.body;
    let startDateJobIds = [];
    if (startDates.length > 0) {
        startDates = startDates.map((date) => utils_1.convertDate(date));
        startDateJobIds = yield jobController.searchByStartDates(startDates);
        startDateJobIds = utils_1.implode(startDateJobIds, 'jobIDS');
    }
    let skillJobIds = yield jobController.searchJobSkills(keywords);
    skillJobIds = utils_1.implode(skillJobIds, 'jobIDS');
    if (skillJobIds.length === 0) {
        skillJobIds[0] = "'-1";
    }
    jobController
        .filterJob(skillJobIds, keywords, lng, lat, trType, trDuration, radius, '', hrmin, hrmax, startDateJobIds)
        .then((docs) => {
        res.json({ data: docs, message: `${docs.length} results found` });
    })
        .catch((error) => next(error));
});
const getMine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID } = req.user;
        const company = (yield companyController.findByuserId(ID)).get();
        if (!company) {
            return res
                .status(400)
                .json({ message: 'There is no job kindly update your profile first' });
        }
        const jobs = yield jobController.getByCompany(company.id);
        return res.json({ data: jobs });
    }
    catch (error) {
        return next(error);
    }
});
router.route('/trtypes').get(trainingTypes);
router.route('/trdurations/:ID').get(trainingDurationByType);
router
    .route('/')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany, utils_1.validateCreateJob], exports.create)
    .get(getJobs);
router.route('/search').get(searchJobs);
router.route('/filter').post(utils_1.validateJobSearchFilter, filterJobs);
router.route('/add/photos').post(addJobPhotos);
router
    .route('/add/questions')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany], addJobQuestions);
router
    .route('/delete/questions/:ID')
    .delete([middlewares_1.verifyToken, middlewares_1.checkCompany], removeJobQuestions);
router
    .route('/add/oneskill')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany, utils_1.validateAddJobSkill], addOneSkill);
router.route('/add/skills').post([middlewares_1.verifyToken, middlewares_1.checkCompany], addJobSkills);
router
    .route('/delete/skills/:ID')
    .delete([middlewares_1.verifyToken, middlewares_1.checkCompany], removeJobSkill);
router
    .route('/add/startdate')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany], addJobStartDates);
router
    .route('/add/startdate/single')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany], addJobSingleStartDates);
router
    .route('/update/startdate/:ID')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany], updateJobStartDate);
router.route('/delete/startdate/:ID').delete(deleteJobStartDate);
router.route('/get/mine').get(middlewares_1.verifyToken, getMine);
exports.default = router;
