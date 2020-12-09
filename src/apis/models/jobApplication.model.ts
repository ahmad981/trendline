// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

export class JobApplication extends Model implements JobApplicationInterface{

  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public jobId!: number;

  public userId!: number;

  public startDate!: Date;

  public resume!: string;

  public status!: number; // 0 pending, 1 accepted, 2 rejected, 3 canceled;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface JobApplicationInterface {
  id?: number;
  userId: number;
  jobId?: number;
  startDate?: any;
  resume ?: string;
  status?: number; // 0 pending, 1 accepted, 2 rejected, 3 canceled;
  createdAt?: any;
  updatedAt?: any;
}


const initJobApplication = () => {

  JobApplication.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jobId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      // underscored: true,
      tableName: 'application',
      sequelize: database, // this bit is important
    },
  );

  JobApplication.sync({ force: false }).then(() =>
    console.log('Organization table created'),
  );
};
export { initJobApplication };