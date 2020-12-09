import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

export class JobSkill extends Model implements JobSkillInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public jobId!: number;

  public skill!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface JobSkillInterface {
  id?: number;
  jobId: number;
  skill: string;
  createdAt?: Date;
  updatedAt?: Date;
}


const initJobSkills = () => {

  JobSkill.init(
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
      skill: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'jobSkill',
      sequelize: database, // this bit is important
      indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['skill'] }],
    },
  );

  JobSkill.sync({ force: false }).then(() =>
    console.log('JobSkill table created'),
  );
};
export { initJobSkills };