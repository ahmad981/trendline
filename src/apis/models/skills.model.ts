import { Model, DataTypes } from 'sequelize';
import { database } from '../../config';

class Skill extends Model implements SkillInterface {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

export interface SkillInterface {
  name: string;
  id?: number;
}

const initSkill = () => {
  Skill.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,

      },
    },
    {
      // underscored: true,
      tableName: 'skills',
      sequelize: database,
      indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['name'] }],
    },
  );

  Skill.sync({ force: false });
};

export { Skill, initSkill };
