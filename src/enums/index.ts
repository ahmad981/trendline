import { RoleInterface, Role, User, UserInterface } from '../apis/models';
import { RoleController, UserController } from '../apis/controllers';
const roleController = new RoleController();
const userController = new UserController();
let roles: Role[] = [];




export const setUpCachedRoles = async () => {
    try {
        roles = await roleController.getRoles();
        console.log('----------- Cached roles  -----------');
        console.log(roles);
        console.log('----------- Cached roles  -----------');
    } catch (error) {
        console.log('cached error : ', error);
    }

}

export const VALIDATION_ERROR_STATUS = 422;
export const ERR_ACCCESS_DENIED = "Access denied.";
export const ERR_FORBIDDEN = "Forbidden";
export const EMAIL_CONFIRM_MSG = "Your email confirmed successfully!";
export const BAD_REQ_MSG = "Bad request";
export const ROLES = roles;
export const getCachedRole = (id: number): RoleInterface => {

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].id === id) {
            return roles[i];
        }
    }

}