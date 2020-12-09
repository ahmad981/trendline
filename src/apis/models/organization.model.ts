// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

export class Organization extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  public domain!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface OrganizationInterface {
  name: string;
  domain: boolean;
}


const initOrganization = () => {

  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      domain: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
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

  Organization.sync({ force: false }).then(() =>
    console.log('Organization table created'),
  );
};
export { initOrganization };