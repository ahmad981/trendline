"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_status_1 = require("http-status");
const error_1 = require("../../middlewares/error");
const controllers_1 = require("../controllers");
const enums_1 = require("../../enums");
const middlewares_1 = require("../../middlewares");
const router = express.Router();
const jobapplicationController = new controllers_1.JobApplicationController();
const create = (req, res, next) => {
    const jobapplication = req.body;
    jobapplication.userId = req.user.ID;
    jobapplicationController
        .create(jobapplication)
        .then((doc) => {
        res.json({ data: doc });
    })
        .catch((error) => next(error));
};
const getAll = (_req, res, next) => {
    jobapplicationController
        .findAll()
        .then((docs) => {
        res.json({ data: docs });
    })
        .catch((error) => next(error));
};
const getOne = (req, res, next) => {
    jobapplicationController
        .getById(Number(req.params.ID))
        .then((org) => {
        res.json(org);
    })
        .catch((error) => next(error));
};
const updateOne = (req, res, next) => {
    const jobApp = req.body;
    jobapplicationController
        .updateJobApplication(jobApp, Number(req.params.ID))
        .then((orgs) => {
        if (orgs[0] > 0) {
            return res.json({ message: 'Updated successfully' });
        }
        return next(new error_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    })
        .catch((error) => next(error));
};
const removeOne = (req, res, next) => {
    jobapplicationController
        .removeOne(Number(req.params.ID))
        .then((_n) => {
        if (_n === 0) {
            return next(new error_1.HttpException(400, 'Item against this id not exist'));
        }
        return res.json({ message: 'deleted JobApplication successfully' });
    })
        .catch((error) => next(error));
};
function test(req, res, next) {
    jobapplicationController
        .getJobsByHour(1)
        .then((docs) => { console.log(docs); res.json(docs); }).catch(err => { console.log(err); res.status(500).json(err); });
}
router.route('/test/app').get(test);
router.route('/').post(middlewares_1.verifyToken, create).get(getAll);
router.route('/:ID').delete([middlewares_1.verifyToken, middlewares_1.checkAdmin], removeOne).put([middlewares_1.verifyToken, middlewares_1.checkAdmin], updateOne).get(getOne);
exports.default = router;
