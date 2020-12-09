import * as express from 'express';
import { Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { checkCompany, HttpException, verifyToken } from '../../middlewares';
import { CompanyInterface, GalleryInterface, AddressInterface, CustomRequest } from '../models';
import { COMPANY_CREATED, UNPROCESSABLE_CONTENT } from '../../enums';
import { CompanyController, AddressController } from '../controllers';

import { validateCompany, validateCompanyAddress, validateCompanyUpdateInfo } from '../../utils/validations/validateOrganization';
import { GalleryController } from '../controllers/gallery.controller';

const router = express.Router();
const companyController = new CompanyController();
const adressController = new AddressController();
const galleryController = new GalleryController();

const create = async (req: CustomRequest, res: Response, next: NextFunction) => {

  const profile: CompanyInterface = req.body;
  const address: AddressInterface = req.body;

  try {

    profile.userId = req.user.ID;
    const company = await companyController.create(profile);
    address.companyId = company.id;
    await adressController.create(address);
    res.json({ message: COMPANY_CREATED });

  } catch (error) {
    next(error);
  }
};

const updateOne = async (req: CustomRequest, res: Response, next: NextFunction) => {

  const profile: CompanyInterface = req.body;

  try {

    const {ID} = req.user;
    const doc = await companyController.updateByUserID(profile, ID);
    if (doc[0] > 0) {
      return res.json({ message: 'Company profile updated successfully' });
    }

    return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));

  } catch (error) {
    return next(error);
  }
};

const updateAddress = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const address: AddressInterface = req.body;
  const {ID} = req.user;
  const company = (await companyController.findByuserId(ID)).get();

  adressController.updateByCompanyId(address, company.id)
    .then((doc) => {
      if (doc[0] > 0) {
        return res.json({ message: 'Address updated successfully' });
      } 
      return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));
            
    })
    .catch((error: any) => next(error));
};

const addPhotoToCompany = async (req: CustomRequest, res: Response, next: NextFunction) => {

  try {
    const {ID} = req.user;
    const company = (await companyController.findByuserId(ID)).get();
    const photo: GalleryInterface = { companyId: company.id, image: req.body.image };
    const gallery = await galleryController.create(photo);
    res.json({ data: gallery, message: 'photo added successfully' });

  } catch (error) {
    console.log(error);
    next(new HttpException(500, 'Some thing went wrong'));
  }
};

const removePhoto = async (req: CustomRequest, res: Response, next: NextFunction) => {

  const {ID} = req.params;
  const userID = req.user.ID;

  const company = (await companyController.findByuserId(userID)).get();

  galleryController.removeOne(Number(ID), Number(company.id)).then((orgs: number) => {

    if (orgs > 0) {
      return res.json({ message: 'photo removed successfully' });
    }

    return next(new HttpException(400, 'Item against this id not exist'));

  })
    .catch((error: any) => next(error));
};

router.route('/')
  .post([verifyToken, checkCompany, validateCompany], create);
router.route('/action/update')
  .put([verifyToken, validateCompanyUpdateInfo], updateOne);
router.route('/update/Address')
  .put([verifyToken, validateCompanyAddress], updateAddress);
router.route('/add/photo')
  .post(verifyToken, addPhotoToCompany);

router.route('/remove/photo/:ID')
  .delete(verifyToken, removePhoto);


export default router;
