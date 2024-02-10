import config from '@config';
const { paramsError } = config.message;
import { User } from '@models'

export const userValidationById = async (id = '') => {
    const userValidation = await User.findById(id);
    if (!userValidation) {
        throw new Error(`${paramsError.msg}`)
    }
};