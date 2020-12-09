/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { Organization, OrganizationInterface } from '../models';
import { OrganizationController } from '../controllers';
import { checkAdmin, HttpException, verifyToken } from '../../middlewares';
import { UNPROCESSABLE_CONTENT } from '../../enums';

const router = express.Router();

const orgController = new OrganizationController();

const create = (req: Request, res: Response, next: NextFunction) => {
  const org: OrganizationInterface = req.body;
  orgController
    .create(org)
    .then((doc: Organization) => {
      res.json({ data: doc });
    })
    .catch((error: any) => {
      return next(error);
    });
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
  orgController
    .getAll()
    .then((orgs: Array<Organization>) => {
      res.json({ data: orgs });
    })
    .catch((error: Error) => next(error));
};

const getOne = (req: Request, res: Response, next: NextFunction) => {
  orgController
    .getById(Number(req.params.ID))
    .then((org: Organization) => {
      res.json({ data: org });
    })
    .catch((error: Error) => next(error));
};

const updateOne = (req: Request, res: Response, next: NextFunction) => {
  const org: Organization = req.body;
  orgController
    .update(org, Number(req.params.ID))
    .then((orgs: [number, Organization[]]) => {
      if (orgs[0] > 0) {
        return res.json({ message: 'Updated successfully' });
      } 
      return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));
      
    })
    .catch((error: Error) => next(error));
};

const removeOne = (req: Request, res: Response, next: NextFunction) => {
  orgController
    .removeOrganization(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'));
      }
      return res.json({ message: 'deleted organization successfully' });
    })
    .catch((error: Error) => next(error));
};

router.route('/')
  .post([verifyToken, checkAdmin], create)
  .get(getAll);
router.route('/:ID')
  .get(getOne)
  .put([verifyToken, checkAdmin], updateOne)
  .delete([verifyToken, checkAdmin], removeOne);

export default router;
