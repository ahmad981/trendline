import * as express from 'express';
import { Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { verifyToken, checkApplicant } from '../../middlewares';
import { validateUserProfile } from '../../utils';
import { CustomRequest, UserProfile, UserProfileInterface } from '../models';
import { UserProfileController } from '../controllers';
import { UNPROCESSABLE_CONTENT, USER_PROF_CREATED } from '../../enums';

const router = express.Router();
const userProfileController = new UserProfileController();

const create = (req: CustomRequest, res: Response, next: NextFunction) => {
  const profile: UserProfileInterface = req.body;
  profile.userId = req.user.ID;
  userProfileController
    .create(profile).then((prof: UserProfile) => {
      res.json({ data: prof, message: USER_PROF_CREATED });
    })
    .catch(error => next(error));
};

const update = (req: CustomRequest, res: Response, next: NextFunction) => {
  const profile: UserProfileInterface = req.body;
  const {ID} = req.user;
  userProfileController
    .updateByUserID(profile, ID).then((orgs: any) => {
      if (orgs[0] > 0) {
        return res.json({ message: 'profile updated successfully' });
      }
      return res.status(UNPROCESSABLE_ENTITY).json({ message: UNPROCESSABLE_CONTENT });
    })
    .catch(error => next(error));
};


router.route('/').post(verifyToken, checkApplicant, validateUserProfile, create);
router.route('/update').put([verifyToken, validateUserProfile], update);
export default router;
