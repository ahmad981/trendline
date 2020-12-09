import { Role, RoleInterface } from '../models';

export class RoleController {
  public getRoles(): Promise<Role[]> {
    return Role.findAll<Role>({ raw: true });
  }

  public getRoleById(id: number): Promise<Role> {
    return Role.findByPk(id);
  }

  public create(role: RoleInterface): Promise<Role> {
    return Role.create<Role>(role);
  }

  public removeRole(id: number): Promise<number> {
    return Role.destroy({ where: { id } });
  }
}
