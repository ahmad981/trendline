"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPhotoController = void 0;
const models_1 = require("../../models");
class JobPhotoController {
    addJobPhotos(photos) {
        return models_1.JobPhotos.bulkCreate(photos);
    }
    addJobPhoto(photo) {
        return models_1.JobPhotos.create(photo);
    }
    removePhotosByJob(id) {
        return models_1.JobPhotos.destroy({ where: { jobId: id } });
    }
}
exports.JobPhotoController = JobPhotoController;
