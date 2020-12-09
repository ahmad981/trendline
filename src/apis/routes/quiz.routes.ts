import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { HttpException } from '../../middlewares/error';
import { 
  QuestionInterface, 
  Question, 
  Option, 
  OptionInterface, 
  CustomRequest,
} from '../models';
import { verifyToken, checkAdmin } from '../../middlewares';
import { QuestionController } from '../controllers';
import { UNPROCESSABLE_CONTENT } from '../../enums';
import { validateCreateQuestions } from '../../utils';

const router = express.Router();
const questionController = new QuestionController();

const create = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.attempts) {
    req.attempts++;
  } else {
    req.attempts = 1;
  }

  const question: QuestionInterface = req.body;
  const {options} = req.body;
  
  let qID = 0;
  let opID = 0;

  try {
    const q = await questionController.create(question);
    qID = q.id;

    options.forEach((op) => {
      op.questionId = qID;
    });
  
    await questionController.createOptions(options);
    opID = 1;

    const doc = await questionController.getQuestionById(q.id);
    res.json({data: doc, message: 'Created Question successfully'});

  } catch (error) {
    
    if (qID !== 0) {
      await questionController.removeOne(qID);
    }

    if (opID === 1) {
      await questionController.removeOptionsByQuestionId(qID);
    }

    if (req.attempts <= 3) {
      create(req, res, next);
    }

    next(error);
  }
  
};

const createOptions = (req: Request, res: Response, next: NextFunction) => {
  const option: OptionInterface = req.body;
  questionController
    .createOneOption(option)
    .then((doc:Option) => {
      res.json({ data: doc });
    })
    .catch((error: Error) => next(error));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
  questionController
    .findAll()
    .then((docs: Array<Question>) => {
      res.json({ data: docs });
    })
    .catch((error: Error) => next(error));
};

const getOptionsByQuestion = (req: Request, res: Response, next: NextFunction) => {
  questionController.getOptionsByQuestionId(Number(req.params.ID))
    .then((docs: OptionInterface[]) => {
      res.json({data: docs, message: 'Found Options'});
    })
    .catch((error : any) => next(error));
};

const getOne = (req: Request, res: Response, next: NextFunction) => {
  questionController
    .getQuestionById(Number(req.params.ID))
    .then((org: Question) => {
      res.json(org);
    })
    .catch((error: Error) => next(error));
};

const updateOne = (req: Request, res: Response, next: NextFunction) => {
  const ind: Question = req.body;
  questionController
    .updateQuestion(ind, Number(req.params.ID))
    .then((orgs: [number, Question[]]) => {
      if (orgs[0] > 0) {
        return res.json({ message: 'Updated successfully' });
      } 
      return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));
            

    })
    .catch((error: Error) => next(error));
};

const updateOption = (req: Request, res: Response, next: NextFunction) => {
  const opt: OptionInterface = req.body;
  questionController
    .updateOption(opt, Number(req.params.ID))
    .then((orgs: [number, OptionInterface[]]) => {
      if (orgs[0] > 0) {
        return res.json({ message: 'Updated successfully' });
      } 
      return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));
            
    })
    .catch((error: Error) => next(error));
};

const removeOption = (req: Request, res: Response, next: NextFunction) => {
  questionController
    .removeOption(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'));
      }
      return res.json({ message: 'deleted Question successfully' });
    })
    .catch((error: Error) => next(error));
};

const removeOne = (req: Request, res: Response, next: NextFunction) => {
  questionController
    .removeOne(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'));
      }
      return res.json({ message: 'deleted Question successfully' });
    })
    .catch((error: Error) => next(error));
};

router.route('/')
  .post([verifyToken, checkAdmin, validateCreateQuestions], create)
  .get(getAll);

router.route('/options/byquestion/:ID')
  .get(getOptionsByQuestion);

router.route('/option')
  .post([verifyToken, checkAdmin], createOptions);

router.route('/:ID')
  .delete([verifyToken, checkAdmin], removeOne)
  .put([verifyToken, checkAdmin], updateOne)
  .get(getOne);

router.route('/options/:ID')
  .put([verifyToken, checkAdmin], updateOption)
  .delete([verifyToken, checkAdmin], removeOption);

export default router;
