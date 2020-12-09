/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status';
import { UserInterface, User } from '../models';
import { UserController } from '../controllers';
import { BAD_REQ_MSG, EMAIL_CONFIRM_MSG, getCachedRole } from '../../enums';
import { generateToken, comparePassword, sendEmailVerification, validateUserSignup, generateHash } from '../../utils';
import { verifyToken, checkSuperAdmin, HttpException, loginLimiter } from '../../middlewares';
import { baseUrl } from '../../config';
import { validateAdminCreation, validateEmpSignup } from '../../utils/validations/validateOrganization';



const verificationLink = `${baseUrl}/user/email/verify?hash=`;
const userController = new UserController();
const router = express.Router();
/**
 * TODO: add authorization middleware.
 * @description only admin can create new user with roles other user will sign up.
 */
const create = async (req: Request, res: Response) => {
  const user: UserInterface = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  userController
    .create(user)
    .then((doc: User) => {
      res.json({ data: doc, message: 'admin created successfully' });
    })
    .catch((error: Error) => res.status(500).json({ message: error.message }));
};

const empSignup = async (req: Request, res: Response, next: NextFunction) => {
  // validate name, email, password.
  try {
    const user: UserInterface = req.body;
    user.roleId = 2;
    user.password = await bcrypt.hash(user.password, 10);
    user.hash = generateHash(user.email);
    const response: User = (await userController.create(user)).get({ plain: true });
    const role = getCachedRole(Number(response.roleId));
    const token = generateToken(response.id, role.name);
    process.nextTick(() => {
      sendEmailVerification(response.name, verificationLink + user.hash, 'verify email', response.email);
    });
    return res.json({ data: { ID: response.id, name: response.name }, token });
  } catch (error) {
    return next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  // validate name, email, password.
  try {
    const user: UserInterface = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    user.hash = generateHash(user.email);
    const response: User = (await userController.create(user)).get({ plain: true });
    const role = getCachedRole(Number(response.roleId));
    const token = generateToken(response.id, role.name);
    process.nextTick(() => {
      sendEmailVerification(response.name, verificationLink + user.hash, 'verify email', response.email);
    });
    return res.json({ data: { ID: response.id, name: response.name }, token });
  } catch (error) {
    return next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  userController
    .findByEmail(email)
    .then((user: User) => {
      
      if (!user) {
        return res.status(UNAUTHORIZED).json({message: 'Email is invalid'});
      }

      if (comparePassword(password, user.password)) {
        const role = getCachedRole(user.roleId);
        
        return res.json({ data: { ID: user.id, name: user.name }, token: generateToken(user.id, role.name) });
      } 
      return res.status(UNAUTHORIZED).json({ message: 'Either email or password is incorrect' });
      
    })
    .catch((error) => {console.log(error); next(error);});
};

const resetPassword = (req: Request, res: Response) => {
  // empty line
  res.json({ message: 'not implemeted yet' });
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  userController.findAll().then((users: User[]) => {
    res.json({ data: users });
  })
    .catch(err => next(err));
};


const getAllCompanies = (req: Request, res: Response, next: NextFunction) => {
  userController.findAllCompanies().then((users: User[]) => {
    res.json({ data: users });
  })
    .catch(err => next(err));
};


const getAdmins = (req: Request, res: Response, next: NextFunction) => {
  userController.findAllAdmins().then((users: User[]) => {
    res.json({ data: users });
  })
    .catch(err => next(err));
};


const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await userController.findByHash(`${req.query.hash  }`);
    if (user) {
      await userController.updateEmailStatus(true, user.id);
      return res.json({ message: EMAIL_CONFIRM_MSG });
    } 
    return next(new HttpException(400, BAD_REQ_MSG));
    
  } catch (error) {
    return next(error);
  }
};


const updateAdmin = (req: Request, res: Response, next: NextFunction) => {};
const deleteAdmin = (req: Request, res: Response, next: NextFunction) => {};

// router.route('/').post([verifyToken, checkSuperAdmin], create);
router.route('/create/admin').post([verifyToken, checkSuperAdmin, validateAdminCreation], create);
router.route('/get/admins').get([verifyToken, checkSuperAdmin], getAdmins);
router.route('/update/admin/:ID')
  .put([verifyToken, checkSuperAdmin], updateAdmin)
  .delete([verifyToken, checkSuperAdmin], deleteAdmin);
router.route('/').get(getAll);
router.route('/signup').post(validateUserSignup, signup);
router.route('/emp/signup').post(validateEmpSignup, empSignup);
router.route('/login').post(loginLimiter, login);
router.route('/email/verify').get(confirmEmail);
router.route('/reset/password').put(resetPassword);
router.route('/companies').get(getAllCompanies);

export default router;
