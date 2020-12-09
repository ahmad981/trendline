import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

export interface AddressInterface {
  id: number;
  lat: number;
  lng: number;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zipcode?: number;
  companyId?: number;
}

class Address extends Model implements AddressInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public lat!: number;

  public lng!: number;

  public line1!: string;

  public line2!: string;

  public city!: string;

  public state!: string;

  public zipcode!: number;

  public companyId!: number;


  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const initAddress = () => {

  Address.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
      },
      line1: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      line2: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      city: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      state: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      zipcode: {
        type: new DataTypes.INTEGER,
        allowNull: false,
      },
      lat: {
        type: new DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: new DataTypes.FLOAT,
        allowNull: false,
      }, 
      // geoLocation : {
      //     type: DataTypes.GEOGRAPHY, (will later uncomment)
      //     allowNull: false
      // }
    },
    {
      // underscored: true,
      tableName: 'address',
      sequelize: database, // this bit is important
    },
  );
  Address.sync({ force: false }).then(() => console.log('Address table created'));
};
// User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
// Role.belongsTo(User);



export { Address, initAddress };