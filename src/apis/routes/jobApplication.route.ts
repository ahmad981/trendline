import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { HttpException } from '../../middlewares/error';

import { CustomRequest, JobApplication, JobApplicationInterface } from '../models';
import { JobApplicationController } from '../controllers';
import { JOBS_STATUSES, UNPROCESSABLE_CONTENT } from '../../enums';
import { checkAdmin, verifyToken } from '../../middlewares';
import { paginate } from '../../utils';

const router = express.Router();

const jobapplicationController = new JobApplicationController();

const create = (req: CustomRequest, res: Response, next: NextFunction) => {
  const jobapplication: JobApplicationInterface = req.body;
  jobapplication.userId = req.user.ID;
  jobapplicationController
    .create(jobapplication)
    .then((doc: JobApplication) => {
      // check employer notifications and send email (if have email notification enabled)
      res.json({ data: doc });
    })
    .catch((error: Error) => next(error));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
  jobapplicationController
    .findAll()
    .then((docs: Array<JobApplication>) => {
      res.json({ data: docs });
    })
    .catch((error: Error) => next(error));
};

const getOne = (req: Request, res: Response, next: NextFunction) => {
  jobapplicationController
    .getById(Number(req.params.ID))
    .then((org: JobApplication) => {
      res.json(org);
    })
    .catch((error: Error) => next(error));
};

const updateOne = (req: Request, res: Response, next: NextFunction) => {
  const jobApp: JobApplication = req.body;
  jobapplicationController
    .updateJobApplication(jobApp, Number(req.params.ID))
    .then((orgs: [number, JobApplication[]]) => {
      if (orgs[0] > 0) {
        return res.json({ message: 'Updated successfully' });
      } 
      return next(new HttpException(UNPROCESSABLE_ENTITY, UNPROCESSABLE_CONTENT));
    })
    .catch((error: Error) => next(error));
};

const removeOne = (req: Request, res: Response, next: NextFunction) => {
  jobapplicationController
    .removeOne(Number(req.params.ID))
    .then((_n: number) => {
      if (_n === 0) {
        return next(new HttpException(400, 'Item against this id not exist'));
      }
      return res.json({ message: 'deleted JobApplication successfully' });
    })
    .catch((error: Error) => next(error));
};

function test(req, res, next) {
  jobapplicationController
    .getJobsByHour(1)
    .then((docs)=>{
      console.log(docs);
      res.json(docs);
    }).catch(err =>{console.log(err); res.status(500).json(err);});
}

const getByJob = (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  jobapplicationController.findByJobId(Number(req.query.ID)).then((docs: JobApplicationInterface[]) => {
    res.json({data: docs});
  }).catch((error: any) => next(error));
};


const getAllActiveJobs = (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page || 1) - 1 ;
  const limit = Number(req.query.limit) || 5;
  jobapplicationController.getJobsByStatus(JOBS_STATUSES.ACCEPTED, page, limit)
    .then((docs: {rows: JobApplicationInterface[], count :number}) => {
      const pagination = paginate(page, limit, docs.count);
      res.json({data: docs.rows, ...pagination});
    })
    .catch((error:any) => next(error));
};

const accept = (req: Request, res: Response, next: NextFunction) => {
  jobapplicationController
    .acceptJobApplication(Number(req.query.ID))
    .then((doc: [number, JobApplicationInterface[]]) => {
      if (doc[0] > 0) {
        // send application acceptance email to both party
        return res.json({message: 'Accepted Application successfully' });
      }

      return res.status(400).json({message: 'Application this ID not found '});
      
    })
    .catch((error: any) => next(error));
};

router.route('/test/app').get(test);
router.route('/').post(verifyToken, create).get(getAll);
router.route('/:ID').delete([verifyToken, checkAdmin], removeOne).put([verifyToken, checkAdmin], updateOne).get(getOne);

export default router;