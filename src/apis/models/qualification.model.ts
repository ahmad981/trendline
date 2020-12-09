// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

export class Qualification extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface QualificationInterface {
  name: string;
}


const initQualification = () => {

  Qualification.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'organization',
      sequelize: database, // this bit is important
    },
  );

  Qualification.sync({ force: false }).then(() =>
    console.log('Organization table created'),
  );
};
export { initQualification };