"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const fs = require("fs");
const multer = require("multer");
exports.fileUploader = (field, folder) => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            const dirs = `${process.cwd()}/public/${folder}`;
            if (!fs.existsSync(dirs)) {
                fs.mkdirSync(dirs);
            }
            cb(null, `./public/${folder}`);
        },
        filename(req, file, cb) {
            cb(null, Date.now() + file.originalname);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        }
        else {
            req.validationError = 'file not supported';
            cb(null, false);
        }
    };
    const upload = multer({
        storage,
        fileFilter,
    });
    return upload.single(field);
};
