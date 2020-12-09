import { Op, Sequelize} from 'sequelize';
import { Skill, SkillInterface } from '../models';

export class SkillController {

  public search(skill: string): Promise<SkillInterface> {
    return Skill.findOne({ where: { name: skill } });
  }

  public getSkills(): Promise<Skill[]> {
    return Skill.findAll<Skill>({ raw: true });
  }

  public getSkillById(id: number): Promise<Skill> {
    return Skill.findByPk(id);
  }

  public create(skill: SkillInterface): Promise<Skill> {
    return Skill.create<Skill>(skill);
  }

  public removeSkill(id: number): Promise<number> {
    return Skill.destroy({ where: { id } });
  }

  public updateSkill(id: number, skill: SkillInterface): Promise<[number, SkillInterface[]]> {
    return Skill.update(skill, { where: { id } });
  }

  public searchFullText(text: string): Promise<SkillInterface[]> {
    return Skill.findAll({
      where: Sequelize.literal('MATCH (name) AGAINST (:name)'), 
      replacements: {name: text},
    });
  }

  /** in progress */
  public searchSkill(query: string): Promise<SkillInterface[]> {
        
    return Skill.findAll({
      where:{
        name: 
                {
                  [Op.like]: `%${query}%`,
                },
            
      },
      limit:10,
    });
  }

}

// return Skill.findAll({
//     where: Sequelize.literal('MATCH (SomeField) AGAINST (:name)'),
//     replacements: {
//         name: 'Alex'
//     }
// })