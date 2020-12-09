import { User, UserInterface, Role, UserProfile, Organization, Industry, Address, Company, Gallery } from '../models';

export class UserController {

  public findAll(): Promise<User[]> {
    return User.findAll({ where: { roleId: 1 }, include: [{ model: Organization, as: 'organization' }, { model: Role, as: 'role' }, { model: UserProfile, as: 'profile' }] });
  }

  public findAllAdmins(): Promise<User[]> {
    const excl = ['updatedAt', 'password', 'organizationId', 'hash', 'isEmailVerified'];
    return User.findAll({ where: { roleId: 3 }, attributes: { exclude: excl }, include: [{ model: Role, as: 'role' }] });
  }

  public findAllCompanies(): Promise<User[]> {

    const exUser: string[] = ['roleId', 'organizationId', 'industryId', 'password', 'hash', 'isEmailVerified', 'createdAt', 'updatedAt'];
    const exCompany = ['userId', 'createdAt', 'updatedAt'];
    const exIndustry = ['createdAt', 'updatedAt'];
    const exAddress = ['companyId', 'createdAt', 'updatedAt'];

    return User.findAll({
      where: { roleId: 2 },
      attributes: { exclude: exUser },

      include: [
        {
          model: Company, as: 'company', attributes: { exclude: exCompany },
          include: [
            {
              model: Gallery, as: 'gallery',
            },
            {
              model: Industry, as: 'industry', attributes: { exclude: exIndustry },
            },
            {
              model: Address, as: 'address', attributes: { exclude: exAddress },
            }],
        }],
    });
  }

  public getTodoById(id: number): Promise<User> {
    return User.findByPk(id);
  }

  public create(user: UserInterface): Promise<User> {
    return User.create<User>(user);
  }

  public findByEmail(email: string): Promise<User> {
    return User.findOne<User>({ where: { email }, raw: true });
  }

  public findByHash(hash: string): Promise<User> {
    return User.findOne<User>({ where: { hash }, raw: true });
  }

  public updateEmailStatus(val: boolean, id: number): Promise<[number, User[]]> {
    return User.update({ isEmailVerified: val }, { where: { id } });
  }

}
