"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_status_1 = require("http-status");
const error_1 = require("../../middlewares/error");
const controllers_1 = require("../controllers");
const enums_1 = require("../../enums");
const middlewares_1 = require("../../middlewares");
const router = express.Router();
const industryController = new controllers_1.IndustryController();
const create = (req, res, next) => {
    const industry = req.body;
    industryController
        .create(industry)
        .then((doc) => {
        res.json({ data: doc });
    })
        .catch((error) => next(error));
};
const getAll = (_req, res, next) => {
    industryController
        .getAll()
        .then((docs) => {
        res.json({ data: docs });
    })
        .catch((error) => next(error));
};
const getOne = (req, res, next) => {
    industryController
        .getById(Number(req.params.ID))
        .then((org) => {
        res.json(org);
    })
        .catch((error) => next(error));
};
const updateOne = (req, res, next) => {
    const ind = req.body;
    industryController
        .updateOne(ind, Number(req.params.ID))
        .then((orgs) => {
        if (orgs[0] > 0) {
            return res.json({ message: 'Updated successfully' });
        }
        return next(new error_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    })
        .catch((error) => next(error));
};
const removeOne = (req, res, next) => {
    industryController
        .removeOne(Number(req.params.ID))
        .then((_n) => {
        if (_n === 0) {
            return next(new error_1.HttpException(400, 'Item against this id not exist'));
        }
        return res.json({ message: 'deleted Industry successfully' });
    })
        .catch((error) => next(error));
};
/**
 *  @swagger
 *
 *
 *    /industry
 *      post:
 *        summary: create industry
 *        description: create industry
 *        requestBody:
 *          content:
 *            schema:
 *              properties:
 *                name:
 *                  type:string
 *        responnses:
 *          201:
 *            description: industry created successfully
 *          422
 *            description: there is some validation error
 *
 */
router.route('/')
    .post([middlewares_1.verifyToken, middlewares_1.checkAdmin], create);
router.route('/').get(getAll);
router.route('/:ID').delete([middlewares_1.verifyToken, middlewares_1.checkAdmin], removeOne).get(getOne);
router.route('/:ID').put([middlewares_1.verifyToken, middlewares_1.checkAdmin], updateOne);
router.route('/:ID').get(getOne);
exports.default = router;
