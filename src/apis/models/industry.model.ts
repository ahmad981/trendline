// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

export class Industry extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface IndustryInterface {
  name: string;
}


const initIndustry = () => {

  Industry.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'industry',
      sequelize: database, // this bit is important
    },
  );

  Industry.sync({ force: false }).then(() =>
    console.log('Organization table created'),
  );
};
export { initIndustry };