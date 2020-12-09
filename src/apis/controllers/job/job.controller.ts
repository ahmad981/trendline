import { Sequelize } from 'sequelize';
import { Job, JobInterface, JobPhotos, JobQuestions, JobSkill, JobStartDate } from '../../models';
import { JobPhotoController } from './jobPhoto.controller';
import { JobSkillController } from './jobSkill.controller';
import { JobQuestionController } from './jobQuestion.controller';
import { JobStartDateController } from './jobStartDate.controller';

export interface JobController extends JobPhotoController, JobSkillController, JobStartDateController, JobQuestionController {}

export class JobController {

  public getById(id: number): Promise<JobInterface> {
    return Job.findOne<Job>({
      where: {id}, 
      include: [
        {
          model: JobPhotos,
          as: 'photos',
          attributes: {
            exclude: ['jobId', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: JobQuestions, 
          as: 'questions', 
          attributes: {
            exclude: [
              'jobId', 
              'createdAt', 
              'updatedAt',
            ],
          },
        }, {
          model: JobSkill,
          as: 'skills',
          attributes: {
            exclude: [
              'jobId',
              'createdAt',
              'updatedAt',
            ],
          },
        }, {
          model: JobStartDate,
          as: 'startDates',
          attributes: {
            exclude: [
              'jobId',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
  }

  public getByCompany(id: number): Promise<Job[]> {
    return Job.findAll<Job>({
      where: {companyId: id}, 
      include: [
        {
          model: JobPhotos,
          as: 'photos',
          attributes: {
            exclude: ['jobId', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: JobQuestions, 
          as: 'questions', 
          attributes: {
            exclude: [
              'jobId', 
              'createdAt', 
              'updatedAt',
            ],
          },
        }, {
          model: JobSkill,
          as: 'skills',
          attributes: {
            exclude: [
              'jobId',
              'createdAt',
              'updatedAt',
            ],
          },
        }, {
          model: JobStartDate,
          as: 'startDates',
          attributes: {
            exclude: [
              'jobId',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
  }

  public getAll(limit: number = 0, page: number = 0): Promise<Job[]> {
    return Job.findAll<Job>({
      where: {}, 
      include: [
        {
          model: JobPhotos,
          as: 'photos',
          attributes: {
            exclude: ['jobId', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: JobQuestions, 
          as: 'questions', 
          attributes: {
            exclude: [
              'jobId', 
              'createdAt', 
              'updatedAt',
            ],
          },
        }, {
          model: JobSkill,
          as: 'skills',
          attributes: {
            exclude: [
              'jobId',
              'createdAt',
              'updatedAt',
            ],
          },
        }, {
          model: JobStartDate,
          as: 'startDates',
          attributes: {
            exclude: [
              'jobId',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
      limit : limit > 0 ? limit : 5,
      offset: page > 0 ? page * (limit > 0 ? limit: 5) : limit, 
    });
  }

  public create(job: JobInterface): Promise<Job> {
    return Job.create<Job>(job);
  }

  public removeJob(id: number): Promise<number> {
    return Job.destroy({ where: { id } });
  }

  public update(
    org: Job,
    id: number,
  ): Promise<[number, Job[]]> {
    return Job.update(org, { where: { id } });
  }

  public removeQuestionsByJob(id: number) : Promise<number> {
    return JobQuestions.destroy({where: {jobId: id}});
  }

  public searchJobs(keywords: string): Promise<JobInterface[]> {
    return Job.findAll({
      where: Sequelize.literal('MATCH (title, description) AGAINST (:search)'), 
      replacements: {search: keywords},
    });
  }

  /**
    * 
    * params {
    *      search: string, 
    *      trDuration: number[], 
    *      trainingType: string[], 
    *      lat: number, 
    *      lng: number, 
    *      radius: number, 
    *      sort: string,
    *      hourlyRate: {min:number, max: number},
    *      stDates: string[] //start dates array
    * }
    * 
    * @description : filter on the base of parameters
    */
  public searchNearJob(
    ids: number[] = [],
    keywords: string = '',
    lng: number = 0, 
    lat: number = 0, 
    radius:number = 10,
    zipcode: number = 0,
    page: number = 0,
    limit: number = 5,
  ): Promise<{rows: JobInterface[], count: number}> {


        
    let query = '';
    
    if ( lat > 0 && lng > 0 ) {
      query += ` ( ST_Distance_Sphere(geoLocation, POINT(${lng}, ${lat})) < ${radius * 1000} ) AND`;
    }

    if (zipcode > 0) {
      query += ` zipcode = ${zipcode} AND `;
    }
    return Job.findAndCountAll({
      where:  Sequelize.literal(`${query} createdAt < date_sub(now(), INTERVAL 5 day) AND  (MATCH (title, industry, description) AGAINST (:search) OR id IN (:skills))`),
      replacements: { search: keywords, skills: ids},
      logging: false,
      offset: page * limit,
      limit,
    });
  }

  /**
    * 
    * params {
    *      search: string, 
    *      trDuration: number[], 
    *      trainingType: string[], 
    *      lat: number, 
    *      lng: number, 
    *      radius: number, 
    *      sort: string,
    *      hourlyRate: {min:number, max: number},
    *      stDates: string[] //start dates array
    * }
    * 
    * @description : filter on the base of parameters
    */
  public filterJob(
    ids: number[] = [],
    keywords: string, 
    lng: number = 0, 
    lat: number = 0, 
    trType: string[] = [], 
    trDuration: number[]=[], 
    radius:number = 10, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sort: string = '', 
    hourlyRateMin: number = 0, 
    hourlyRateMax: number = 0,
    stdates: number[] = [],
    page: number = 0,
    limit: number = 5,
  ): Promise<{rows: JobInterface[], count: number}> {


        
    let query = '';
        
    if (hourlyRateMax > 0) {
      query += ` hourlyRate >= ${hourlyRateMin} AND hourlyRate <= ${hourlyRateMax} `;
    }

    if (stdates.length > 0) {
      query += ` AND id IN (${stdates}) `;
    }
        
    if (trDuration.length > 0) {
      query += `AND trDuration IN (${trDuration}) `;
    }
        
    if (trType.length > 0) {
      query += ` AND trainingType IN (${trType}) `;
    }

    if ( lat > 0 && lng > 0 ) {
      query += ` AND ( ST_Distance_Sphere(geoLocation, POINT(${lng}, ${lat})) < ${radius * 1000} ) `;
    }

        
    return Job.findAndCountAll({
      where:  Sequelize.literal(`${query} AND createdAt < date_sub(now(), INTERVAL 5 day) AND  (MATCH (title, industry, description) AGAINST (:search IN BOOLEAN MODE) OR id IN (:skills))`),
      replacements: { search: keywords, skills: ids},
      order:['trDuration'],
      logging: false,
      limit,
      offset: page * limit,
    });
  }

}



function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name),
      );
    });
  });
}

applyMixins(JobController, [JobPhotoController, JobSkillController, JobStartDateController, JobQuestionController]);
