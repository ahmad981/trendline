"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middlewares_1 = require("../../middlewares");
const skill_controller_1 = require("../controllers/skill.controller");
const router = express.Router();
const skillController = new skill_controller_1.SkillController();
const create = (req, res, next) => {
    const skill = req.body;
    skillController.create(skill).then((doc) => {
        res.json({ data: doc, message: 'Skill created successfully' });
    })
        .catch((error) => next(error));
};
const getAll = (req, res, next) => {
    skillController.getSkills().then((docs) => {
        res.json({ data: docs });
    }).catch((error) => next(error));
};
const updateSkill = (req, res, next) => {
    const skill = req.body;
    skillController.updateSkill(Number(req.params.ID), skill).then((doc) => {
        if (doc[0] > 0) {
            return res.json({ message: 'updated successfully' });
        }
        return res.status(422).json({ message: 'item against this id does not exist' });
    }).catch((error) => next(error));
};
const removeSkill = (req, res, next) => {
    skillController.removeSkill(Number(req.params.ID)).then((doc) => {
        if (doc > 0) {
            return res.json({ message: 'deleted successfully' });
        }
        return res.status(422).json({ message: 'item against this id does not exist' });
    }).catch((error) => next(error));
};
const search = (req, res, next) => {
    const query = req.query.search.toString();
    skillController.searchSkill(query)
        .then((docs) => {
        res.json({ data: docs });
    }).catch((error) => next(error));
};
router.route('/').post([middlewares_1.verifyToken, middlewares_1.checkAdmin], create)
    .get(getAll);
router.route('/:ID')
    .put([middlewares_1.verifyToken, middlewares_1.checkAdmin], updateSkill)
    .delete([middlewares_1.verifyToken, middlewares_1.checkAdmin], removeSkill);
router.route('/search').get(search);
exports.default = router;
