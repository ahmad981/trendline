import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

export class JobQuestions extends Model implements JobQuestionsInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public jobId!: number;

  public question!: string;

  public answer!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface JobQuestionsInterface {
  id?: number;
  jobId: number;
  question: string;
  answer: string;

  createdAt?: Date;
  updatedAt?: Date;
}


const initJobQuestions = () => {

  JobQuestions.init(
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
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'jobQuiz',
      sequelize: database, // this bit is important
    },
  );

  JobQuestions.sync({ force: false }).then(() =>
    console.log('JobQuestions table created'),
  );
};
export { initJobQuestions };