"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("../../utils");
const router = express.Router();
/**
 * Media Upload Helper
 */
router
    .route('/upload')
    .post(utils_1.fileUploader('image', 'files'), (req, res) => {
    if (!req.validationError) {
        res.json({ image: req.file.path.replace('/public', '') });
    }
    else {
        res.status(422).json({ message: 'File not supported' });
    }
});
exports.default = router;
