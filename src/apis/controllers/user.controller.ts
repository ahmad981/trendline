import { hash } from 'bcryptjs';
import { User, UserInterface, Role } from '../models';

export class UserController {
  public findAll(): Promise<User[]> {
    return User.findAll({ include: [{ model: Role, as: 'role' }] });
  }

  public getTodoById(id: number): Promise<User> {
    return User.findByPk(id);
  }

  public create(user: UserInterface): Promise<User> {
    return User.create<User>(user);
  }

  public findByEmail(email: string): Promise<User> {
    return User.findOne<User>({ where: { email: email }, raw: true });
  }

  public findByHash(hash: string): Promise<User> {
    return User.findOne<User>({ where: { hash: hash }, raw: true });
  }

  public updateEmailStatus(val: boolean, id: number): Promise<[number, User[]]> {
    return User.update({ isEmailVerified: val }, { where: { id: id } });
  }
}
