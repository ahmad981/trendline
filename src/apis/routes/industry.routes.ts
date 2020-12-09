import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { HttpException } from '../../middlewares/error';

import { Industry, IndustryInterface } from '../models';
import { AddressController, IndustryController } from '../controllers';
import { UNPROCESSABLE_CONTENT } from '../../enums';
import { checkAdmin, verifyToken } from '../../middlewares';

const router = express.Router();

const industryController = new IndustryController();


const create = (req: Request, res: Response, next: NextFunction) => {
  const industry: IndustryInterface = req.body;
  industryController
    .create(industry)
    .then((doc: Industry) => {
      res.json({ data: doc });
    })
    .catch((error: Error) => next(error));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
  industryController
    .getAll()
    .then((docs: Array<Industry>) => {
      res.json({ data: docs });
    })
    .catch((error: Error) => next(error));
};

const getOne = (req: Request, res: Response, next: NextFunction) => {
  industryController
    .getById(Number(req.params.ID))
    .then((org: Industry) => {
      res.json(org);
    })
    .catch((error: Error) => next(error));
};

const updateOne = (req: Request, res: Response, next: NextFunction) => {
  const ind: Industry = req.body;
  industryController
    .updateOne(ind, Number(req.params.ID))
    .then((orgs: [number, Industry[]]) => {
      if (orgs[0] > 0) {
        return res.json({ message: 'Updated successfully' });
      } 
      return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));
            

    })
    .catch((error: Error) => next(error));
};

const removeOne = (req: Request, res: Response, next: NextFunction) => {
  industryController
    .removeOne(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'));
      }
      return res.json({ message: 'deleted Industry successfully' });
    })
    .catch((error: Error) => next(error));
};

/**
 *  @swagger
 *    
 * 
 *    /industry
 *      post:
 *        summary: create industry
 *        description: create industry
 *        requestBody:
 *          content:
 *            schema:
 *              properties:
 *                name:
 *                  type:string
 *        responnses:
 *          201:
 *            description: industry created successfully
 *          422
 *            description: there is some validation error
 *          
 */
router.route('/')
  .post([verifyToken, checkAdmin], create);

router.route('/').get(getAll);

router.route('/:ID').delete([verifyToken, checkAdmin], removeOne).get(getOne);




router.route('/:ID').put([verifyToken, checkAdmin], updateOne);


router.route('/:ID').get(getOne);
export default router;