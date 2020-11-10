import { Role, RoleInterface } from "../apis/models";

const seedRoles: RoleInterface[] = [
    {
        "id": 1,
        "name": "Applicant"
    },
    {
        "id": 2,
        "name": "Employer"
    },
    {
        "id": 3,
        "name": "Admin"
    },
    {
        "id": 4,
        "name": "SuperAdmin"
    }
];
export const makeRolesSeed = async () => {
    try {
        await Role.destroy({ where: {} });
        await Role.bulkCreate(seedRoles);
    } catch (error) {
        console.log('Seed Error : ', error);
    }
}
