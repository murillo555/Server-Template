import config from '@config'
import { Role } from '@models'
const { paramsError, entityExists } = config.message;
const { permissionList } = config

//Roles
export const uniqueRoleValidation = async (role = '') => {
    const rolValidation = await Role.findOne({ role });
    if (rolValidation) {
        throw new Error(`${entityExists.msg}`)
    }
};
export const roleValidation = async (role = '') => {
    const rolValidation = await Role.findById(role);
    if (!rolValidation) throw new Error(`${paramsError.msg}`)
};

export const roleRoutesValidation = async (routes = []) => {
    const validation = await routes.every(routes => permissionList.includes(routes));
    if (!validation) throw new Error(`${paramsError.msg}`)
};