import { Address, Company, CompanyInterface } from '../models';

export class CompanyController {
  public findAll(): Promise<Company[]> {
    return Company.findAll({});
  }

  public getCompanyById(id: number): Promise<Company> {
    return Company.findByPk(id);
  }

  public create(user: CompanyInterface): Promise<Company> {
    return Company.create<Company>(user);
  }

  public findByuserId(id: number): Promise<Company> {
    return Company.findOne({ where: { userId: id }, include: {model: Address, as: 'address'} });
  }

  public updateCompany(prof: CompanyInterface, id: number): Promise<[number, Company[]]> {
    return Company.update(prof, { where: { id } });
  }

  public updateByUserID(prof: CompanyInterface, userID: number): Promise<[number, Company[]]> {
    return Company.update(prof, { where: { userId: userID } });
  }
}
