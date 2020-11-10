// lib/models/node.model.ts
import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../../config';
import { Role } from '../models';
class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public password!: string;
  public email!: string;
  public roleId!: number;
  public name!: string;
  public role?: any;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface UserInterface {
  email: string;
  password?: string;
  roleId: number;
  role?: any;
  name?: string;
  organizationId?: number;
  organization?: any;
  hash?: string;
  isEmailVerified?: boolean;
}

const initUser = () => {

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      organizationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      hash: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      // underscored: true,
      tableName: 'users',
      sequelize: database, // this bit is important
    }
  );
  User.sync({ force: false }).then(() => console.log('Todo table created'));
}
// User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
// Role.belongsTo(User);



export { User, initUser };