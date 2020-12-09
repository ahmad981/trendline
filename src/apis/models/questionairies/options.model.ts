import { Model, DataTypes } from 'sequelize';
import { database } from '../../../config';

export class Option extends Model implements OptionInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public option!: string;

  public questionId!: number;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface OptionInterface {
  option: string;
  id?: number;
  questionId?: number;
}


const initOptions = () => {

  Option.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      option: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'options',
      sequelize: database, // this bit is important
    },
  );

  Option.sync({ force: false }).then(() =>
    console.log('Question table created'),
  );
};
export { initOptions };