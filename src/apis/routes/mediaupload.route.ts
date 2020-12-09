import * as express from 'express';
import { Response } from 'express';
import { fileUploader } from '../../utils';
import { CustomRequest } from '../models';

const router = express.Router();
/**
 * Media Upload Helper
 */

router
  .route('/upload')
  .post(fileUploader('image', 'files'), (req: CustomRequest, res: Response) => {
    if (!req.validationError) {
      res.json({ image: req.file.path.replace('/public', '') });
    } else {
      res.status(422).json({ message: 'File not supported' });
    }

  });


export default router;