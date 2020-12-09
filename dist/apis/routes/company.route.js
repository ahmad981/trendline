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
const middlewares_1 = require("../../middlewares");
const enums_1 = require("../../enums");
const controllers_1 = require("../controllers");
const validateOrganization_1 = require("../../utils/validations/validateOrganization");
const gallery_controller_1 = require("../controllers/gallery.controller");
const router = express.Router();
const companyController = new controllers_1.CompanyController();
const adressController = new controllers_1.AddressController();
const galleryController = new gallery_controller_1.GalleryController();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = req.body;
    const address = req.body;
    try {
        profile.userId = req.user.ID;
        const company = yield companyController.create(profile);
        address.companyId = company.id;
        yield adressController.create(address);
        res.json({ message: enums_1.COMPANY_CREATED });
    }
    catch (error) {
        next(error);
    }
});
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = req.body;
    try {
        const { ID } = req.user;
        const doc = yield companyController.updateByUserID(profile, ID);
        if (doc[0] > 0) {
            return res.json({ message: 'Company profile updated successfully' });
        }
        return next(new middlewares_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    }
    catch (error) {
        return next(error);
    }
});
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.body;
    const { ID } = req.user;
    const company = (yield companyController.findByuserId(ID)).get();
    adressController.updateByCompanyId(address, company.id)
        .then((doc) => {
        if (doc[0] > 0) {
            return res.json({ message: 'Address updated successfully' });
        }
        return next(new middlewares_1.HttpException(http_status_1.UNPROCESSABLE_ENTITY, enums_1.UNPROCESSABLE_CONTENT));
    })
        .catch((error) => next(error));
});
const addPhotoToCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID } = req.user;
        const company = (yield companyController.findByuserId(ID)).get();
        const photo = { companyId: company.id, image: req.body.image };
        const gallery = yield galleryController.create(photo);
        res.json({ data: gallery, message: 'photo added successfully' });
    }
    catch (error) {
        console.log(error);
        next(new middlewares_1.HttpException(500, 'Some thing went wrong'));
    }
});
const removePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID } = req.params;
    const userID = req.user.ID;
    const company = (yield companyController.findByuserId(userID)).get();
    galleryController.removeOne(Number(ID), Number(company.id)).then((orgs) => {
        if (orgs > 0) {
            return res.json({ message: 'photo removed successfully' });
        }
        return next(new middlewares_1.HttpException(400, 'Item against this id not exist'));
    })
        .catch((error) => next(error));
});
router.route('/')
    .post([middlewares_1.verifyToken, middlewares_1.checkCompany, validateOrganization_1.validateCompany], create);
router.route('/action/update')
    .put([middlewares_1.verifyToken, validateOrganization_1.validateCompanyUpdateInfo], updateOne);
router.route('/update/Address')
    .put([middlewares_1.verifyToken, validateOrganization_1.validateCompanyAddress], updateAddress);
router.route('/add/photo')
    .post(middlewares_1.verifyToken, addPhotoToCompany);
router.route('/remove/photo/:ID')
    .delete(middlewares_1.verifyToken, removePhoto);
exports.default = router;
