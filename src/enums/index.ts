import { RoleInterface, Role } from '../apis/models';
import { RoleController } from '../apis/controllers';

const roleController = new RoleController();
let roles: Role[] = [];


export * from './pagination.interface';
export * from './trTypes';
export * from './trdurations';
export const VALIDATION_ERROR_STATUS = 422;
export const ERR_ACCCESS_DENIED = 'Access denied.';
export const ERR_FORBIDDEN = 'Forbidden';
export const EMAIL_CONFIRM_MSG = 'Your email confirmed successfully!';
export const BAD_REQ_MSG = 'Bad request';
export const USER_PROF_CREATED = 'Profile Created Successfully';
export const COMPANY_CREATED = 'Company profile created successfully';
export const UNPROCESSABLE_CONTENT = 'Unprocessable content';
export const ROLES = roles;
export const JOBS_STATUSES = {
  'PENDING': 0,
  'ACCEPTED': 1,
  'REJECTED': 2,
  'CANCELED': 3,
};



export const setUpCachedRoles = async () => {
  try {
    roles = await roleController.getRoles();
  } catch (error) {
    console.log('cached error : ', error);
  }
};

export const getCachedRole = (id: number): RoleInterface => {

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].id === id) {
      return roles[i];
    }
  }
  return null;
};