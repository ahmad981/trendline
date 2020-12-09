import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

export class JobPhotos extends Model implements JobPhotosInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public jobId!: number;

  public image!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface JobPhotosInterface {
  id?: number;
  jobId: number;
  image: string;

  createdAt?: Date;
  updatedAt?: Date;
}


const initJobPhotos = () => {

  JobPhotos.init(
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
      image: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'jobPhotos',
      sequelize: database, // this bit is important
    },
  );

  JobPhotos.sync({ force: false }).then(() =>
    console.log('JobSkill table created'),
  );
};
export { initJobPhotos };