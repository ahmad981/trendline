import * as bcrypt from 'bcryptjs';
import { User, Role, RoleInterface } from '../apis/models';

const seedRoles: RoleInterface[] = [
  {
    'id': 1,
    'name': 'Applicant',
  },
  {
    'id': 2,
    'name': 'Employer',
  },
  {
    'id': 3,
    'name': 'Admin',
  },
  {
    'id': 4,
    'name': 'SuperAdmin',
  },
];

export const makeRolesSeed = async () => {
  try {
    await Role.destroy({ where: {} });
    await Role.bulkCreate(seedRoles);
  } catch (error) {
    console.log('Seed Error : ', error);
  }
};


/**
 * remove all admins
 * add new admin
 */
export const seedSuperAdmin = async () => {
  try {
    await User.destroy({ where: { roleId: 4 } });
    await User.create({ email: 'shahkhalidsuperadmin@gmail.com', password: bcrypt.hashSync('123456', 10), roleId: 4, name: 'Shah Khalid' });
  } catch (error) {
    console.log('Super Admin Seed Error : ', error);
  }
};
