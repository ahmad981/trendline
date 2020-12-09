"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express = require("express");
const http_status_1 = require("http-status");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../middlewares");
const enums_1 = require("../../enums");
const router = express.Router();
const orgController = new controllers_1.OrganizationController();
const create = (req, res, next) => {
    const org = req.body;
    orgController
        .create(org)
        .then((doc) => {
        res.json({ data: doc });
    })
        .catch((error) => {
        return next(error);
    });
};
const getAll = (_req, res, next) => {
    orgController
        .getAll()
        .then((orgs) => {
        res.json({ data: orgs });
    })
        .catch((error) => next(error));
};
const getOne = (req, res, next) => {
    orgController
        .getById(Number(req.params.ID))
        .then((org) => {
        res.json({ data: org });
    })
        .catch((error) => next(error));
};
const updateOne = (req, res, next) => {
    const org = req.body;
    orgController
        .update(org, Number(req.params.ID))
        .then((orgs) => {
        if (orgs[0] > 0) {
            return res.json({ message: 'Updated successfully' });
        }
        return next(new middlewares_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    })
        .catch((error) => next(error));
};
const removeOne = (req, res, next) => {
    orgController
        .removeOrganization(Number(req.params.ID))
        .then((_n) => {
        if (_n === 0) {
            return next(new middlewares_1.HttpException(400, 'Item against this id not exist'));
        }
        return res.json({ message: 'deleted organization successfully' });
    })
        .catch((error) => next(error));
};
router.route('/')
    .post([middlewares_1.verifyToken, middlewares_1.checkAdmin], create)
    .get(getAll);
router.route('/:ID')
    .get(getOne)
    .put([middlewares_1.verifyToken, middlewares_1.checkAdmin], updateOne)
    .delete([middlewares_1.verifyToken, middlewares_1.checkAdmin], removeOne);
exports.default = router;
