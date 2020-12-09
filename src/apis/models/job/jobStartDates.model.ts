import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

export class JobStartDate extends Model implements JobStartDatesInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public jobId!: number;

  public date!: Date;

  public time: Date;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface JobStartDatesInterface {
  id?: number;
  jobId: number;
  date: Date;
  time: Date;
  createdAt?: any;
  updatedAt?: any;
}


const initJobStartDate = () => {

  JobStartDate.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      jobId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
      },
    },
    {
      // underscored: true,
      tableName: 'jobStartDate',
      sequelize: database, // this bit is important
    },
  );

  JobStartDate.sync({ force: false }).then(() =>
    console.log('Organization table created'),
  );
};
export { initJobStartDate };