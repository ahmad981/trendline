import { Sequelize } from 'sequelize';
import { JobSkill, JobSkillInterface } from '../../models';

export class JobSkillController {

  public addJobSkills(skills: JobSkillInterface[]): Promise<JobSkillInterface[]> {
    return JobSkill.bulkCreate(skills);
  }

  public removeJobSkills(id: number): Promise<number> {
    return JobSkill.destroy({where: {id}});
  }

  public removeSkillsByJob(id: number) : Promise<number> {
    return JobSkill.destroy({where: {jobId: id}});
  }

  public addJobOneSkill(skill: JobSkillInterface): Promise<JobSkillInterface> {
    return JobSkill.create(skill);
  }

  /**
     * @param keywords {}
     * @description : make full text search and return distinct jobids
     */
  public searchJobSkills(keywords: string): Promise<any> {
    return JobSkill.findAll({
      // attributes: [
      //   [Sequelize.fn('DISTINCT', Sequelize.col('jobId')), 'jobIDS'],
      // ],
      where: Sequelize.literal('MATCH (skill) AGAINST (:search IN BOOLEAN MODE)'),
      replacements: {search: keywords},
      raw: true,
    });
  }
    


}

