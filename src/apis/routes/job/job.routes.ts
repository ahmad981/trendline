/* eslint-disable no-param-reassign */
import * as express from 'express';
import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { checkAdmin, checkCompany, verifyToken } from '../../../middlewares';
import {
  convertDate,
  implode,
  validateAddJobSkill,
  validateCreateJob,
  validateJobSearchFilter,
} from '../../../utils';
import { CompanyController, IndustryController } from '../../controllers';
import { JobController } from '../../controllers/job/job.controller';
import { SkillController } from '../../controllers/skill.controller';
import {
  CompanyInterface,
  CustomRequest,
  JobInterface,
  JobPhotosInterface,
  JobQuestionsInterface,
  JobSkillInterface,
  JobStartDatesInterface,
} from '../../models';
import { trTypes, getDurationByType } from '../../../enums';
import { filterStopwords } from '../../../utils/filterStopWords';

const router = express.Router();
const jobController = new JobController();
const skillController = new SkillController();
const companyController = new CompanyController();
const industryController = new IndustryController();

const trainingTypes = (req: Request, res: Response) => {
  res.json({ data: trTypes, message: 'Found Training Types' });
};

const trainingDurationByType = (req: Request, res: Response) => {
  const durations = getDurationByType(Number(req.params.ID));
  res.json({ data: durations, message: 'Found Durations' });
};

export const addSkills = async (
  jobID: number,
  skills: string[],
): Promise<JobSkillInterface[]> => {
  await Promise.all(
    _.map(skills, async (skill: string) => {
      const doc = await skillController.search(skill);
      if (!doc) {
        await skillController.create({ name: skill });
      }
    }),
  );

  const jobSkills: JobSkillInterface[] = [];

  skills.forEach((element: string) => {
    const js: JobSkillInterface = { jobId: jobID, skill: element };
    jobSkills.push(js);
  });

  return jobController.addJobSkills(jobSkills);
};

const addphotos = (photos: string[], jobID: number) => {
  const jobPhotos: JobPhotosInterface[] = [];
  photos.forEach((photo: string) => {
    const jp: JobPhotosInterface = { jobId: jobID, image: photo };
    jobPhotos.push(jp);
  });
  return jobController.addJobPhotos(jobPhotos);
};

const addQuestions = (questions: JobQuestionsInterface[], jobID: number) => {
  questions.forEach((q: JobQuestionsInterface) => {
    q.jobId = jobID;
  });
  return jobController.addJobQuestions(questions);
};

const addStartDates = (stds: JobStartDatesInterface[], jobID: number) => {
  stds.forEach((std: JobStartDatesInterface) => {
    std.jobId = jobID;
    std.date = new Date(std.date);
  });
  console.log('-------- start dates -------');
  console.log(stds);
  console.log('-------- start dates -------');
  return jobController.addJobStartDates(stds);
};

export const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.attempts) {
    req.attempts++;
  } else {
    req.attempts = 1;
  }

  const job: JobInterface = req.body;
  const { ID } = req.user;

  let jobID = 0;
  let sk = 0;
  let jp = 0;
  let jq = 0;
  let jstd = 0;

  try {
    const company: CompanyInterface =
      await companyController.findByuserId(ID);
    if (!company) {
      return res.status(403).json({ message: 'Please update company profile' });
    }

    job.companyId = company.id;
    const point = {
      type: 'Point',
      coordinates: [company.address.lng, company.address.lat],
    };
    job.geoLocation = point;
    job.zipcode = company.address.zipcode;
    job.industry = (await industryController.getById(company.industryId)).name;
    // add industry later to job from company

    const jobCreated = (await jobController.create(job)).get();
    jobID = jobCreated.id;
    
    await addSkills(jobCreated.id, req.body.skills);
    sk = 1;
    await addphotos(req.body.photos, jobID);
    jp = 1;
    await addQuestions(req.body.questions, jobID);
    jq = 1;
    await addStartDates(req.body.startDates, jobID);
    jstd = 1;
    const doc = await jobController.getById(jobID);
    return res.json({ data: doc, message: 'job created successfully' });
  } catch (error) {
    if (jobID !== 0) {
      await jobController.removeJob(jobID);
    }
    if (sk === 1) {
      await jobController.removeSkillsByJob(jobID);
    }
    if (jp === 1) {
      await jobController.removePhotosByJob(jobID);
    }

    if (jq === 1) {
      await jobController.removeQuestionsByJob(jobID);
    }

    if (jstd === 1) {
      await jobController.removeStartDatesByJob(jobID);
    }

    if (req.attempts <= 3) {
      create(req, res, next);
    }

    return next(error);
  }
};

// eslint-disable-next-line consistent-return
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createJob = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const job: JobInterface = req.body;
  const { ID } = req.user;
  try {
    const company: CompanyInterface = (
      await companyController.findByuserId(ID)
    ).get();
    if (!company) {
      return res.status(403).json({ message: 'Please update company profile' });
    }

    job.companyId = company.id;
    const point = {
      type: 'Point',
      coordinates: [company.address.lng, company.address.lat],
    };
    job.geoLocation = point;

    const doc = jobController.create(job);
    return res.json({ data: doc, message: 'Created Successfully' });
  } catch (error) {
    return next(error);
  }
};

const deleteJobStartDate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ID = Number(req.params.ID);
  jobController
    .removeJobStartDate(ID)
    .then((n: number) => {
      if (n > 0) {
        return res.json({ message: 'Start Date deleted successfully' });
      }
      return res
        .status(422)
        .json({ message: 'Item against this id does not exist' });
    })
    .catch((error: any) => {
      return next(error);
    });
};

const updateJobStartDate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jobStartDate: JobStartDatesInterface = req.body;
  const ID = Number(req.params.ID);
  jobController
    .updateJobStartDate(ID, jobStartDate)
    .then((doc: [number, JobStartDatesInterface[]]) => {
      if (doc[0] > 0) {
        return res.json({ message: 'Start Date updated successfully' });
      }
      return res
        .status(422)
        .json({ message: 'Item against this id does not exist' });
    })
    .catch((error: any) => next(error));
};

const addJobSingleStartDates = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jobStartDate: JobStartDatesInterface = req.body;
  jobStartDate.jobId = Number(req.query.jobID);
  jobStartDate.date = new Date(jobStartDate.date);
  jobController
    .addJobSingleStartDate(jobStartDate)
    .then((doc: JobStartDatesInterface) => {
      res.json({ data: doc, message: 'Start Date Added successfully' });
    })
    .catch((error: any) => next(error));
};

const addJobStartDates = (req: Request, res: Response, next: NextFunction) => {
  const jobStartDates: JobStartDatesInterface[] = req.body;
  console.log('query id ', req.query.jobId);
  for (let i = 0; i < jobStartDates.length; i++) {
    jobStartDates[i].jobId = Number(req.query.jobId);
    // jobStartDates[i].date = new Date(jobStartDates[i].date);
  }

  jobController
    .addJobStartDates(jobStartDates)
    .then((docs: JobStartDatesInterface[]) => {
      res.json({ data: docs, message: 'Start Dates Added successfully' });
    })
    .catch((error: any) => { console.log(error); next(error); });
};

const removeJobSkill = (req: Request, res: Response, next: NextFunction) => {
  const ID = Number(req.params.ID);
  jobController
    .removeJobSkills(ID)
    .then((n: number) => {
      if (n > 0) {
        res.json({ message: 'skill removed successfully' });
      } else {
        res.status(403).json({ message: 'item against id does not exist' });
      }
    })
    .catch((error: any) => next(error));
};

const addJobSkills = (req: Request, res: Response, next: NextFunction) => {
  const jobSkills: JobSkillInterface[] = req.body;
  for (let i = 0; i < jobSkills.length; i++) {
    jobSkills[i].jobId = Number(req.query.jobID);
  }
  jobController
    .addJobSkills(jobSkills)
    .then((docs: JobSkillInterface[]) => {
      res.json({ data: docs, message: 'Job Skills Added successfully' });
    })
    .catch((error: any) => next(error));
};

const addJobPhoto = (req: Request, res: Response, next: NextFunction) => {
  const jobPhoto: JobPhotosInterface = req.body;
  jobPhoto.jobId = Number(req.query.jobID);
  
  jobController
    .addJobPhoto(jobPhoto)
    .then((doc: JobPhotosInterface) => {
      res.json({data: doc, message: 'Job Photos Added successfully' });
    })
    .catch((error: any) => next(error));
};

const removeJobQuestions = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ID = Number(req.params.ID);
  jobController
    .removeJobQuestion(ID)
    .then((n: number) => {
      if (n > 0) {
        res.json({ message: 'Job Questions removed successfully' });
      } else {
        res.status(422).json({ message: 'item against id does not exist' });
      }
    })
    .catch((error: any) => next(error));
};

const addJobQuestions = (req: Request, res: Response, next: NextFunction) => {
  const jobquestion: JobQuestionsInterface = req.body;
  jobquestion.jobId = Number(req.query.jobID);
  jobController
    .addJobQuestion(jobquestion)
    .then((docs: JobQuestionsInterface) => {
      res.json({ data: docs, message: 'Job Questions Added successfully' });
    })
    .catch((error: any) => next(error));
};

const addOneSkill = async (req: Request, res: Response, next: NextFunction) => {
  const jobSkill: JobSkillInterface = req.body;
  jobSkill.jobId = Number(req.query.jobID);
  const skills = await skillController.searchFullText(jobSkill.skill);
  if (skills.length === 0) {
    await skillController.create({ name: jobSkill.skill });
  }

  jobController
    .addJobOneSkill(jobSkill)
    .then((doc: JobSkillInterface) => {
      res.json({ data: doc, message: 'Job Skill Added successfully' });
    })
    .catch((error: any) => next(error));
};

const getJobs = (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page || 0);
  const limit = Number(req.query.limit || 0);
  jobController
    .getAll(limit, page)
    .then((docs: JobInterface[]) => {
      return res.json({ data: docs, message: `${docs.length} jobs found` });
    })
    .catch((error: any) => next(error));
};

/**
 * @params : search {string}
 * @params lat {number}
 * @params lng {number}
 *
 */
const searchJobs = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page || 1) - 1;
  const limit = Number(req.query.limit) || 5;

  try {
    const keywords: string = filterStopwords(req.query.search.toString());

    const lat = Number(req.query.lat) || 0;
    const lng = Number(req.query.lng) || 0;
    const zipcode = Number(req.query.zipcode) || 0;
     
    let skills = await jobController.searchJobSkills(keywords);

    skills = implode(skills, 'jobIDS');
    if (skills.length === 0) {
      skills = [1, 2, 3];
    }

    jobController
      .searchNearJob(skills, keywords, lng, lat, 10, zipcode, page, limit)
      .then((docs: {rows: JobInterface[], count: number}) => {
        res.json({ data: docs.rows, totalDocs: docs.count, page: page + 1, hasNext: (page + 1)*limit < docs.count, limit, hasPrev: page > 0 });
      })
      .catch((error) => res.json(error));
  } catch (error) {
    next(error);
  }
};

/**
 * params {
 *      search: string,
 *      trDuration: number[],
 *      trainingType: string[],
 *      lat: number,
 *      lng: number,
 *      radius: number,
 *      sort: string,
 *      hourlyRate: {min:number, max: number},
 * }
 */
const filterJobs = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page || 1) - 1;
  const limit = Number(req.query.limit) || 5;
  
  const keywords = filterStopwords(req.body.search.toString());
  let lat = 0;
  let lng = 0;
  
  if (req.body.geoLocation) {
    lat = Number(req.body.geoLocation.lat || 0);
    lng = Number(req.body.geoLocation.lng || 0);
  }
  
  const hrmin = Number(req.body.hourlyRate.min);
  const hrmax = Number(req.body.hourlyRate.max);
  const radius = Number(req.body.radius || 10);
  const trType = implode(req.body.trType || []);
  const trDuration = req.body.trDuration || [];
  let { startDates } = req.body;
  let startDateJobIds = [];

  if (startDates.length > 0) {
    startDates = startDates.map((date) => convertDate(date));
    startDateJobIds = await jobController.searchByStartDates(startDates);
    startDateJobIds = implode(startDateJobIds, 'jobIDS');
  }

  let skillJobIds = await jobController.searchJobSkills(keywords);
  skillJobIds = implode(skillJobIds, 'jobIDS');
  if (skillJobIds.length === 0) {
    skillJobIds[0] = -1;
  }

  jobController
    .filterJob(
      skillJobIds,
      keywords,
      lng,
      lat,
      trType,
      trDuration,
      radius,
      '',
      hrmin,
      hrmax,
      startDateJobIds,
      page,
      limit,
    )
    .then((docs: {rows: JobInterface[], count: number}) => {
      res.json({ data: docs.rows, totalDocs:docs.count, limit, page:page+1, hasNext: (page+1)*limit<docs.count, hasPrev: page>0});
    })
    .catch((error) => next(error));
};

const getMine = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ID } = req.user;
    const company = (await companyController.findByuserId(ID)).get();
    if (!company) {
      return res
        .status(400)
        .json({ message: 'There is no job kindly update your profile first' });
    }
    const jobs = await jobController.getByCompany(company.id);
    return res.json({ data: jobs });
  } catch (error) {
    return next(error);
  }
};

router.route('/trtypes').get(trainingTypes);

router.route('/trdurations/:ID').get(trainingDurationByType);

router
  .route('/')
  .post(
    [verifyToken, checkCompany, validateCreateJob],
    create, /* createJob */
  )
  .get([verifyToken, checkAdmin], getJobs);

router.route('/search').get(searchJobs);

router.route('/filter').post(validateJobSearchFilter, filterJobs);

router.route('/add/photo').post([verifyToken, checkCompany], addJobPhoto);

router
  .route('/add/questions')
  .post([verifyToken, checkCompany], addJobQuestions);

router
  .route('/delete/questions/:ID')
  .delete([verifyToken, checkCompany], removeJobQuestions);

router
  .route('/add/oneskill')
  .post([verifyToken, checkCompany, validateAddJobSkill], addOneSkill);

router.route('/add/skills')
  .post([verifyToken, checkCompany], addJobSkills);

router
  .route('/delete/skills/:ID')
  .delete([verifyToken, checkCompany], removeJobSkill);

router
  .route('/add/startdate')
  .post([verifyToken, checkCompany], addJobStartDates);

router
  .route('/add/startdate/single')
  .post([verifyToken, checkCompany], addJobSingleStartDates);

router
  .route('/update/startdate/:ID')
  .post([verifyToken, checkCompany], updateJobStartDate);

router.route('/delete/startdate/:ID').delete(deleteJobStartDate);

router.route('/get/mine').get(verifyToken, getMine);

export default router;





