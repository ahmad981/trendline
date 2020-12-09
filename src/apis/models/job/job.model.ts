import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

class Job extends Model implements JobInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public title!: string;

  public description!: string;

  public companyId!: number;

  public noOfOpenings!: number;

  public trainingType!: string;

  public trDuration!: number;

  public trDescription!: string;

  public geoLocation!: DataTypes.GeographyDataType;

  public isPaid!: boolean;

  public hourlyRate!: number;

  public zipcode!: number;

  public industry!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface JobInterface {
  id?: number;
  title: string;
  description?: string;
  trainingType: string;
  trDescription?: any; // traing description
  trDuration?: number; // training duration (no. of days)
  noOfOpenings?: number;
  companyId?: number;
  jobPhotos?: string[];
  jobAddress?: any;
  geoLocation: any;
  isPaid: boolean,
  hourlyRate?: number;
  zipcode:number;
  industry: string;

  createdAt?: any;
  updatedAt?: any;
}

const init = () => {

  Job.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      companyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      trainingType: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },

      trDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      trDuration: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      noOfOpenings: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      hourlyRate: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      geoLocation: {
        type: DataTypes.GEOMETRY('POINT', 4326),
      },
      zipcode: {
        type: DataTypes.INTEGER,
      },
      industry: {
        type: DataTypes.TEXT,
      },
    },
    {
      // underscored: true,
      tableName: 'jobs',
      sequelize: database,
      indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['title', 'industry', 'description'] }],
    },
  );
  Job.sync({ force: false, alter: true })
    .then(() => console.log('Jobs table created'))
    .catch(error => console.log(error));
};



export { Job, init };