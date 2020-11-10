// lib/models/node.model.ts
import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from '../../config';
class UserProfile extends Model implements UserProfileInterface {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public userId!: number;
    public phone!: string;
    public address!: string;
    public linkedin!: string;
    public age!: number;
    public education!: number;
    public gender!: number; // 1 male, 0 Female;
    public empStatus!: number; // 0 un employed, 1 full time, 2 part time;
    public anIncome!: number; // annula income
    public gradCompDate!: string; // graduation completion date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export interface UserProfileInterface {
    id?: number; // Note that the `null assertion` `!` is required in strict mode.
    userId?: number;
    phone?: string;
    address: string | number;
    linkedin: string;
    age: number;
    education: number;
    gender: number; // 1 male, 0 Female;
    empStatus: number; // 0 un employed, 1 full time, 2 part time;
    anIncome: number; // annula income
    gradCompDate: string; // graduation completion date;
}

const initUserProfile = () => {

    UserProfile.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            phone: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            address: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
            linkedin: {
                type: new DataTypes.STRING(128),
                allowNull: true,
            },
        },
        {
            // underscored: true,
            tableName: 'userProfiles',
            sequelize: database, // this bit is important
        }
    );
    UserProfile.sync({ force: false }).then(() => console.log('Todo table created'));
}


// User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
// Role.belongsTo(User);


export { UserProfile, initUserProfile };