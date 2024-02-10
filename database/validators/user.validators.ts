import config from '@config'
import { User } from '@models'
const { paramsError, entityExists } = config.message;
const { permissionList } = config

export const emailValidation = async (email = '') => {
    const emailvalidation = await User.findOne({ email });
    if (emailvalidation) {
        throw new Error(`${entityExists.msg}`)
    }
};
export const userValidationById = async (id = '') => {
    const userValidation = await User.findById(id);
    if (!userValidation) {
        throw new Error(`${paramsError.msg}`)
    }
};