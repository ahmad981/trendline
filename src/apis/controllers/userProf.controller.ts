import { UserProfile, UserProfileInterface } from '../models';

export class UserProfileController {
  public findAll(): Promise<UserProfile[]> {
    return UserProfile.findAll({});
  }

  public getUserProfileById(id: number): Promise<UserProfile> {
    return UserProfile.findByPk(id);
  }

  public create(user: UserProfileInterface): Promise<UserProfile> {
    return UserProfile.create<UserProfile>(user);
  }

  public findByuserId(id: number): Promise<UserProfile> {
    return UserProfile.findOne({ where: { userId: id } });
  }

  public updateUserProfile(prof: UserProfileInterface, id: number): Promise<[number, UserProfile[]]> {
    return UserProfile.update(prof, { where: { id } });
  }

  public updateByUserID(prof: UserProfileInterface, userID: number): Promise<[number, UserProfile[]]> {
    return UserProfile.update(prof, { where: { userId: userID } });
  }
}
