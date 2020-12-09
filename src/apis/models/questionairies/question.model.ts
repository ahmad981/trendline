import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

export class Question extends Model implements QuestionInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public question!: string;

  public type!: number;

  public category!: number;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface QuestionInterface {
  question: string;
  id?: number;
  type?: number;
  category?: number;
  options?: any;
}


const initQuestions = () => {

  Question.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false, 
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'question',
      sequelize: database, // this bit is important
    },
  );

  Question.sync({ force: false }).then(() =>
    console.log('Question table created'),
  );
};
export { initQuestions };