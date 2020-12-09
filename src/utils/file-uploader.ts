import * as fs from 'fs';
import * as multer from 'multer';

export const fileUploader = (field: string, folder: string) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const dirs = `${process.cwd()  }/public/${folder}`;
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
    } else {
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
