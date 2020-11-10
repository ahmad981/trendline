import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../middlewares/error';
const router = express.Router();

import { Role, RoleInterface } from '../models';
import { RoleController } from '../controllers';

const roleController = new RoleController();

const create = (req: Request, res: Response, next: NextFunction) => {
  const role: RoleInterface = req.body;
  roleController
    .create(role)
    .then((role: Role) => {
      res.json(role);
    })
    .catch((error: Error) => next(error));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
  roleController
    .getRoles()
    .then((orgs: Array<Role>) => {
      res.json(orgs);
    })
    .catch((error: Error) => next(error));
};

const getOne = (req: Request, res: Response, next: NextFunction) => {
  roleController
    .getRoleById(Number(req.params.ID))
    .then((org: Role) => {
      res.json(org);
    })
    .catch((error: Error) => next(error));
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

const removeOne = (req: Request, res: Response, next: NextFunction) => {
  roleController
    .removeRole(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'));
      }
      res.json({ message: 'deleted role successfully' });
    })
    .catch((error: Error) => next(error));
};

router.route('/').post(create).get(getAll);
router.route('/:ID').get(getOne).delete(removeOne);
export default router;
