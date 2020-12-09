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
const express = require("express");
const http_status_1 = require("http-status");
const error_1 = require("../../middlewares/error");
const middlewares_1 = require("../../middlewares");
const controllers_1 = require("../controllers");
const enums_1 = require("../../enums");
const router = express.Router();
const questionController = new controllers_1.QuestionController();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.attempts) {
        req.attempts++;
    }
    else {
        req.attempts = 1;
    }
    const question = req.body;
    const { options } = req.body;
    let qID = 0;
    let opID = 0;
    try {
        const q = yield questionController.create(question);
        qID = q.id;
        options.forEach((op) => {
            op.questionId = qID;
        });
        yield questionController.createOptions(options);
        opID = 1;
        const doc = yield questionController.getQuestionById(q.id);
        res.json({ data: doc, message: 'Created Question successfully' });
    }
    catch (error) {
        if (qID !== 0) {
            yield questionController.removeOne(qID);
        }
        if (opID === 1) {
            yield questionController.removeOptionsByQuestionId(qID);
        }
        if (req.attempts <= 3) {
            create(req, res, next);
        }
        next(error);
    }
});
const createOptions = (req, res, next) => {
    const option = req.body;
    questionController
        .createOneOption(option)
        .then((doc) => {
        res.json({ data: doc });
    })
        .catch((error) => next(error));
};
const getAll = (_req, res, next) => {
    questionController
        .findAll()
        .then((docs) => {
        res.json({ data: docs });
    })
        .catch((error) => next(error));
};
const getOptionsByQuestion = (req, res, next) => {
    questionController.getOptionsByQuestionId(Number(req.params.ID))
        .then((docs) => {
        res.json({ data: docs, message: 'Found Options' });
    })
        .catch((error) => next(error));
};
const getOne = (req, res, next) => {
    questionController
        .getQuestionById(Number(req.params.ID))
        .then((org) => {
        res.json(org);
    })
        .catch((error) => next(error));
};
const updateOne = (req, res, next) => {
    const ind = req.body;
    questionController
        .updateQuestion(ind, Number(req.params.ID))
        .then((orgs) => {
        if (orgs[0] > 0) {
            return res.json({ message: 'Updated successfully' });
        }
        return next(new error_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    })
        .catch((error) => next(error));
};
const updateOption = (req, res, next) => {
    const opt = req.body;
    questionController
        .updateOption(opt, Number(req.params.ID))
        .then((orgs) => {
        if (orgs[0] > 0) {
            return res.json({ message: 'Updated successfully' });
        }
        return next(new error_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    })
        .catch((error) => next(error));
};
const removeOption = (req, res, next) => {
    questionController
        .removeOption(Number(req.params.ID))
        .then((_n) => {
        if (_n === 0) {
            return next(new error_1.HttpException(400, 'Item against this id not exist'));
        }
        return res.json({ message: 'deleted Question successfully' });
    })
        .catch((error) => next(error));
};
const removeOne = (req, res, next) => {
    questionController
        .removeOne(Number(req.params.ID))
        .then((_n) => {
        if (_n === 0) {
            return next(new error_1.HttpException(400, 'Item against this id not exist'));
        }
        return res.json({ message: 'deleted Question successfully' });
    })
        .catch((error) => next(error));
};
router.route('/')
    .post([middlewares_1.verifyToken, middlewares_1.checkAdmin], create)
    .get(getAll);
router.route('/options/byquestion/:ID')
    .get(getOptionsByQuestion);
router.route('/option')
    .post([middlewares_1.verifyToken, middlewares_1.checkAdmin], createOptions);
router.route('/:ID')
    .delete([middlewares_1.verifyToken, middlewares_1.checkAdmin], removeOne)
    .put([middlewares_1.verifyToken, middlewares_1.checkAdmin], updateOne)
    .get(getOne);
router.route('/options/:ID')
    .put([middlewares_1.verifyToken, middlewares_1.checkAdmin], updateOption)
    .delete([middlewares_1.verifyToken, middlewares_1.checkAdmin], removeOption);
exports.default = router;
