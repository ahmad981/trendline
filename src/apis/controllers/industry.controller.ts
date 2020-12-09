import { Industry, IndustryInterface } from '../models';

export class IndustryController {
  
  

  public getAll(): Promise<Industry[]> {
    return Industry.findAll<Industry>({ raw: true });
  }

  public getById(id: number): Promise<Industry> {
    return Industry.findOne({where: {id}, raw: true});
  }

  public create(role: IndustryInterface): Promise<Industry> {
    return Industry.create<Industry>(role);
  }

  public removeOne(id: number): Promise<number> {
    return Industry.destroy({ where: { id } });
  }

  public updateOne(industry: Industry, id: number): Promise<[number, Industry[]]> {
    return Industry.update(industry, { where: { id } });
  }
}
