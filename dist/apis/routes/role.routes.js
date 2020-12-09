"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const error_1 = require("../../middlewares/error");
const controllers_1 = require("../controllers");
const router = express.Router();
const roleController = new controllers_1.RoleController();
const create = (req, res, next) => {
    const role = req.body;
    roleController
        .create(role)
        .then((doc) => {
        res.json({ data: doc });
    })
        .catch((error) => next(error));
};
const getAll = (_req, res, next) => {
    roleController
        .getRoles()
        .then((orgs) => {
        res.json(orgs);
    })
        .catch((error) => next(error));
};
const getOne = (req, res, next) => {
    roleController
        .getRoleById(Number(req.params.ID))
        .then((org) => {
        res.json(org);
    })
        .catch((error) => next(error));
};
// const updateOne = (req: Request, res: Response, next: NextFunction) => {
//   const org: Role = req.body;
//   roleController
//     (org, Number(req.params.ID))
//     .then((orgs: [number, Role[]]) => {
//       res.json({ message: 'Updated successfully' });
//     })
//     .catch((error: Error) => next(error));
// };
const removeOne = (req, res, next) => {
    roleController
        .removeRole(Number(req.params.ID))
        .then((_n) => {
        if (_n === 0) {
            return next(new error_1.HttpException(400, 'Item against this id not exist'));
        }
        return res.json({ message: 'deleted role successfully' });
    })
        .catch((error) => next(error));
};
router.route('/').post(create).get(getAll);
router.route('/:ID').get(getOne).delete(removeOne);
exports.default = router;
