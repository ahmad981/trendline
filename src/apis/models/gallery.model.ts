// lib/models/node.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

export class Gallery extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public image!: string;

  public companyId!: number;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface GalleryInterface {
  image: string;
  id?: number;
  companyId?: number;
}


const initGallery = () => {

  Gallery.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      // underscored: true,
      tableName: 'gallery',
      sequelize: database, // this bit is important
    },
  );

  Gallery.sync({ force: false }).then(() =>
    console.log('Organization table created'),
  );
};
export { initGallery };