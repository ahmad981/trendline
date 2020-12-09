/**
 * companyName, address, companyLogo, workSpacePhotos, industry, description, title
 */
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

class Company extends Model implements CompanyInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public userId!: number;

  public logo!: string;

  public title!: string;

  public description!: string;

  public industryId!: number; // 1 male, 0 Female;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface CompanyInterface {
  id?: number; // Note that the `null assertion` `!` is required in strict mode.
  userId?: number;
  logo: string;
  title: string | number;
  description: string;
  industryId?: number;
  address?: any;
  photos?: string[];
}

const initCompany = () => {

  Company.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      logo: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      industryId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      // underscored: true,
      tableName: 'company',
      sequelize: database, // this bit is important
    },
  );
  Company.sync({ force: false }).then(() => console.log('user profile table created'));
};


export { Company, initCompany };