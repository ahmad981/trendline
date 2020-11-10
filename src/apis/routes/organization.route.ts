/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Organization, OrganizationInterface } from '../models';
import { OrganizationController } from '../controllers';
import { ValidationError } from 'sequelize';
import { HttpException } from '../../middlewares';
const router = express.Router();

const orgController = new OrganizationController();

const create = (req: Request, res: Response, next: NextFunction) => {
  const org: OrganizationInterface = req.body;
  orgController
    .create(org)
    .then((org: Organization) => {
      res.json(org);
    })
    .catch((error: ValidationError | Error | any) => {
      return next(error);
    });
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
  orgController
    .getAll()
    .then((orgs: Array<Organization>) => {
      res.json(orgs);
    })
    .catch((error: Error) => next(error));
};

const getOne = (req: Request, res: Response, next: NextFunction) => {
  orgController
    .getById(Number(req.params.ID))
    .then((org: Organization) => {
      res.json(org);
    })
    .catch((error: Error) => next(error));
};

const updateOne = (req: Request, res: Response, next: NextFunction) => {
  const org: Organization = req.body;
  orgController
    .update(org, Number(req.params.ID))
    .then((orgs: [number, Organization[]]) => {
      res.json({ message: 'Updated successfully' });
    })
    .catch((error: Error) => next(error));
};

const removeOne = (req: Request, res: Response, next: NextFunction) => {
  orgController
    .removeOrganization(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'))
      }
      res.json({ message: 'deleted organization successfully' });
    })
    .catch((error: Error) => next(error));
};

router.route('/').post(create).get(getAll);
router.route('/:ID').get(getOne).put(updateOne).delete(removeOne);

export default router;
