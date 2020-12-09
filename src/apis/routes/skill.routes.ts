import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { checkAdmin, verifyToken } from '../../middlewares';
import { SkillController } from '../controllers/skill.controller';
import { CustomRequest, SkillInterface } from '../models';

const router = express.Router();
const skillController = new SkillController();

const create = (req: Request, res: Response, next: NextFunction) => {
  const skill: SkillInterface = req.body;
  skillController.create(skill).then((doc: SkillInterface) => {
    res.json({ data: doc, message: 'Skill created successfully' });
  })
    .catch((error: any) => next(error));
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
  skillController.getSkills().then((docs: SkillInterface[]) => {
    res.json({ data: docs });
  }).catch((error: any) => next(error));
};

const updateSkill = (req: CustomRequest, res: Response, next: NextFunction) => {
  const skill: SkillInterface = req.body;
  skillController.updateSkill(Number(req.params.ID), skill).then((doc: [number, SkillInterface[]]) => {
    if (doc[0] > 0) {
      return res.json({message: 'updated successfully'});
    } 
    return res.status(422).json({message: 'item against this id does not exist'});
    
  }).catch((error: any)=> next(error));
};

const removeSkill = (req: CustomRequest, res: Response, next: NextFunction) => {
  
  skillController.removeSkill(Number(req.params.ID)).then((doc: number) => {
    if (doc > 0) {
      return res.json({message: 'deleted successfully'});
    } 
    return res.status(422).json({message: 'item against this id does not exist'});
    
  }).catch((error: any)=> next(error));
};

const search = (req: Request, res: Response, next: NextFunction) => {
  const query: string = req.query.search.toString();
  skillController.searchSkill(query)
    .then((docs: SkillInterface[]) => {
      res.json({ data: docs });
    }).catch((error: any) => next(error));
};



router.route('/').post([verifyToken, checkAdmin], create)
  .get(getAll);

router.route('/:ID')
  .put([verifyToken, checkAdmin], updateSkill)
  .delete([verifyToken, checkAdmin], removeSkill);

router.route('/search').get(search);

export default router;
