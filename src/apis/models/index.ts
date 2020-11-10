export * from './user.model';
export * from './organization.model';
export * from './role.model';
export * from './employmentStatus.model';
export * from './qualification.model';
export * from './userProfile.model';

import { Role, initRole } from './role.model';
import { User, initUser } from './user.model';
import { Organization, initOrganization } from './organization.model';
import { EmploymentStatus, initEmploymentStatuses } from './employmentStatus.model';
import { Qualification, initQualification } from './qualification.model';
import { UserProfile, initUserProfile } from './userProfile.model';
import { setUpCachedRoles } from '../../enums';
import { makeRolesSeed } from '../../utils';
const init = async () => {
    await initRole();
    await initUser();
    await initOrganization();
    await initEmploymentStatuses();
    // await initUserProfile();

    // await Role.sync({ alter: false });
    // await User.sync({ alter: false });
    await User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
    await User.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
    // await UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'profile' });
    // await User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });

    await makeRolesSeed();
    setUpCachedRoles();
}

init();