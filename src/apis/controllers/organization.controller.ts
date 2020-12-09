import { Organization, OrganizationInterface } from '../models';

export class OrganizationController {
  public getAll(): Promise<Organization[]> {
    return Organization.findAll<Organization>({});
  }

  public getById(id: number): Promise<Organization> {
    return Organization.findByPk(id);
  }

  public create(user: OrganizationInterface): Promise<Organization> {
    return Organization.create<Organization>(user);
  }

  public removeOrganization(id: number): Promise<number> {
    return Organization.destroy({ where: { id } });
  }

  public update(
    org: Organization,
    id: number,
  ): Promise<[number, Organization[]]> {
    return Organization.update(org, { where: { id } });
  }
}
