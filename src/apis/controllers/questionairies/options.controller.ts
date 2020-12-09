import { Option, OptionInterface } from '../../models';

export class OptionController {
    
  public updateOption(opt: OptionInterface, id: number): Promise<[number, OptionInterface[]]> {
    return Option.update(opt, { where: { id } });
  }

  public createOptions(options: OptionInterface[]) : Promise<OptionInterface[]>{
    return Option.bulkCreate(options);
  }

  public createOneOption(option: OptionInterface): Promise<Option> {
    return Option.create(option);
  }

  public getOptionsByQuestionId(id: number) : Promise<OptionInterface[]> {
    return Option.findAll({where: {questionId: id}});
  }

  public removeOption(id: number) : Promise<number> {
    return Option.destroy({where: {id}});
  }

  public removeOptionsByQuestionId(id: number):Promise<number> {
    return Option.destroy({where: {questionId: id}});
  }
}

