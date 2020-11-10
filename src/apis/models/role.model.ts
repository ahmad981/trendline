// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

class Role extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface RoleInterface {
  name: string;
  id?: number;
}

const initRole = () => {
  Role.init(
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
      tableName: 'roles',
      sequelize: database, // this bit is important
    }
  );

  Role.sync({ force: false });
}


export { Role, initRole };