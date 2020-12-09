import { Sequelize } from 'sequelize';
import { JOBS_STATUSES } from '../../enums';
import { JobApplication, JobApplicationInterface } from '../models';

export class JobApplicationController {

  public findAll(): Promise<JobApplication[]> {
    return JobApplication.findAll({});
  }

  public getById(id: number): Promise<JobApplication> {
    return JobApplication.findByPk(id);
  }

  public create(jobapplication: JobApplicationInterface): Promise<JobApplicationInterface> {
    return JobApplication.create<JobApplication>(jobapplication);
  }

  public findByJobId(id: number): Promise<JobApplicationInterface[]> {
    return JobApplication.findAll({ where: { jobId: id } });
  }

  public findByApplicant(id: number): Promise<JobApplication> {
    return JobApplication.findOne({ where: { userId: id } });
  }

  public updateJobApplication(jobapplication: JobApplicationInterface, id: number): Promise<[number, JobApplication[]]> {
    return JobApplication.update(jobapplication, { where: { id } });
  }

  public removeOne(id: number): Promise<number> {
    return JobApplication.destroy({ where: { id } });
  }

  public acceptJobApplication(id: number): Promise<[number, JobApplication[]]> {
    return JobApplication.update({ status: JOBS_STATUSES.ACCEPTED }, { where: { id } });
  }

  public rejectJobApplication(id: number): Promise<[number, JobApplication[]]> {
    return JobApplication.update({ status: JOBS_STATUSES.REJECTED }, { where: { id } });
  }

  public cancelJobApplication(id: number): Promise<[number, JobApplication[]]> {
    return JobApplication.update({ status: JOBS_STATUSES.CANCELED }, { where: { id } });
  }

  public getJobsByHour(hours: number) : Promise<JobApplicationInterface[]> {
    return JobApplication.findAll({
      where: {
        'createdAt':{
          $gt: Sequelize.fn(
            'DATE_SUB',
            Sequelize.literal('NOW()'),
            Sequelize.literal(`INTERVAL ${hours} HOUR`),
          ),
        },
      },
    });
  }

  public getJobsByStatus(status: number, page: number = 0, limit: number = 5) : Promise<{rows: JobApplicationInterface[], count: number}> {
    return JobApplication.findAndCountAll({
      where: {status},
      limit,
      offset: page*limit,
    });
  }
}
