import { Sequelize } from 'sequelize';
import { JobStartDate, JobStartDatesInterface } from '../../models';

export class JobStartDateController {
  /**
     * @param keywords {}
     * @description : make full text search and return distinct jobids
     */
  public searchByStartDates(dates: string[]): Promise<any> {
    return JobStartDate.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('jobId')), 'jobIDS'],
      ],
      where: Sequelize.literal('date IN (:search)'),
      replacements: {search: dates},
      raw: true,
    });
  }



  public removeJobStartDate(id: number): Promise<number> {
    return JobStartDate.destroy({where: {id}});
  }


  public addJobStartDates(startDates: JobStartDatesInterface[]): Promise<JobStartDatesInterface[]> {
    return JobStartDate.bulkCreate(startDates);
  }



  public updateJobStartDate(id: number, startDate: JobStartDatesInterface): Promise<[number, JobStartDatesInterface[]]> {
    return JobStartDate.update(startDate, {where: {id}});
  }



  public addJobSingleStartDate(startDate: JobStartDatesInterface): Promise<JobStartDatesInterface> {
    return JobStartDate.create(startDate);
  }

  public removeStartDatesByJob(id: number) : Promise<number> {
    return JobStartDate.destroy({where: {jobId: id}});
  }

  
}

