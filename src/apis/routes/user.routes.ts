/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import { UserInterface, User } from '../models';
import { UserController } from '../controllers';
import { BAD_REQ_MSG, EMAIL_CONFIRM_MSG, getCachedRole } from '../../enums';
import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';
import { generateToken, comparePassword, sendEmailVerification, validateUserSignup, generateHash } from '../../utils';
import { verifyToken, checkAdmin, checkSuperAdmin, HttpException } from '../../middlewares';
import { UNAUTHORIZED } from 'http-status';
import { baseUrl } from '../../config';

const verificationLink = `${baseUrl}/user/email/verify?hash=`;
const userController = new UserController();
const router = express.Router();
/**
 * TODO: add authorization middleware.
 * @description only admin can create new user with roles other user will sign up.
 */
const create = (req: Request, res: Response) => {
  const user: UserInterface = req.body;
  userController
    .create(user)
    .then((user: User) => {
      res.json(user);
    })
    .catch((error: Error) => res.status(500).json(error.message));
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  //validate name, email, password.
  try {
    const user: UserInterface = req.body;
    console.log('user', user);
    user.password = await bcrypt.hash(user.password, 10);
    user.hash = generateHash(user.email);
    const response: User = (await userController.create(user)).get({ plain: true });
    let role = getCachedRole(Number(response.roleId));
    const token = generateToken(response.id, role.name);
    process.nextTick(() => {
      sendEmailVerification(response.name, verificationLink + user.hash, 'verify email', response.email);
    })
    res.json({ data: { ID: response.id, name: response.name }, token: token });
  } catch (error) {
    console.log('Sign up Error', error);
    return next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  userController
    .findByEmail(email)
    .then((user: User) => {
      if (comparePassword(password, user.password)) {
        let role = getCachedRole(user.roleId);
        res.json({ data: { ID: user.id, name: user.name }, token: generateToken(user.id, role.name) });
      } else {
        res.status(UNAUTHORIZED).json({ message: 'Either email or password is incorrect' });
      }
    })
    .catch((error) => next(error));
};

const resetPassword = (req: Request, res: Response, next: NextFunction) => {
  // empty line
  res.json({ message: 'not implemeted yet' });
}

const getAll = (req: Request, res: Response, next: NextFunction) => {
  userController.findAll().then((users: User[]) => {
    res.json(users);
  })
    .catch(err => next(err));
}

const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await userController.findByHash(req.query.hash + "");
    if (user) {
      await userController.updateEmailStatus(true, user.id);
      res.json({ message: EMAIL_CONFIRM_MSG });
    } else {
      return next(new HttpException(400, BAD_REQ_MSG));
    }

  } catch (error) {
    next(error);
  }
}

router.route('/').post([verifyToken, checkSuperAdmin], create);
router.route('/').get(getAll);
router.route('/signup').post(validateUserSignup, signup);
router.route('/login').post(login);
router.route('/email/verify').get(confirmEmail);
router.route('/reset/password').put(resetPassword);

export default router;
