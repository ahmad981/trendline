import { Request } from 'express';
import { Role, initRole } from './role.model';
import { User, initUser, UserInterface } from './user.model';
import { UserProfile, initUserProfile } from './userProfile.model';
import { Organization, initOrganization } from './organization.model';
import { Industry, initIndustry } from './industry.model';
import { Company, initCompany } from './company.model';
import { initAddress, Address } from './address.model';
import { Gallery, initGallery } from './gallery.model';
import { initSkill } from './skills.model';


import { setUpCachedRoles } from '../../enums';
import { makeRolesSeed } from '../../utils';

import { seedSuperAdmin } from '../../utils/seed';
import { Job, initJob, initJobSkills } from './job';

import { initQuestionaries, Question, Option } from './questionairies';
import { initJobApplication, JobApplication } from './jobApplication.model';



export interface CustomRequest extends Request {
  user: UserInterface,
  validationError: string,
  file: any,
  attempts: number
}

export * from './user.model';
export * from './organization.model';
export * from './role.model';
export * from './industry.model';
export * from './qualification.model';
export * from './userProfile.model';
export * from './company.model';
export * from './address.model';
export * from './gallery.model';
export * from './job';
export * from './skills.model';
export * from './questionairies';
export * from './jobApplication.model';

export const initModels = async () => {
  await initRole();
  await initUser();
  
  await makeRolesSeed();
  await seedSuperAdmin();
  setUpCachedRoles();

  await initOrganization();
  await initIndustry();
  await initUserProfile();
  await initCompany();
  await initAddress();
  await initGallery();
  await initJob();
  await initSkill();
  await initQuestionaries();
  await initJobApplication();
  // await initJobSkills();
  
  await User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
  await User.belongsTo(Organization, { foreignKey: 'organizationId', as: 'organization' });
  await UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'profile' });
  await User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
  await User.hasOne(Company, { foreignKey: 'userId', as: 'company' });
  await Company.hasOne(Address, { foreignKey: 'companyId', as: 'address' });
  await Company.belongsTo(Industry, { foreignKey: 'industryId', as: 'industry' });
  await Company.hasMany(Gallery, { foreignKey: 'companyId', as: 'gallery' });
  // await Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
  await Job.belongsTo(Company, {foreignKey: 'companyId', as: 'jobs'});
  await Question.hasMany(Option, { foreignKey: 'questionId', as: 'options' });
  await JobApplication.belongsTo(Job, {foreignKey: 'jobId', as: 'applications'});
    
  await makeRolesSeed();
  await seedSuperAdmin();
  setUpCachedRoles();
};
// initModels();

if (process.env.NODE_ENV !== 'testing') {
  initModels();
}
