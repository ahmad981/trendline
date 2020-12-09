// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

class UserProfile extends Model implements UserProfileInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public userId!: number;

  public phone!: string;

  public address!: string;

  public linkedIn!: string;

  public age!: number;

  public education!: string;

  public gender!: number; // 1 male, 0 Female;

  public empStatus!: number; // 0 un employed, 1 full time, 2 part time;

  public anIncome!: number; // annula income

  public gradCompDate!: string; // graduation completion date;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface UserProfileInterface {
  id?: number; // Note that the `null assertion` `!` is required in strict mode.
  userId?: number;
  phone: string;
  address: string | number;
  linkedIn: string;
  age: number;
  education: string;
  gender: number; // 1 male, 0 Female;
  empStatus: number; // 0 un employed, 1 full time, 2 part time;
  anIncome: number; // annula income
  gradCompDate: string; // graduation completion date;
}

const initUserProfile = () => {

  UserProfile.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      education: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      gender: {   // 0 female, 1 male
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      gradComDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      anIncome: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      phone: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      address: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      linkedIn: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      empStatus: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'userProfiles',
      sequelize: database, // this bit is important
    },
  );
  UserProfile.sync({ force: false }).then(() => console.log('user profile table created'));
};


export { UserProfile, initUserProfile };