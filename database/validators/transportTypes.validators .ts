import config from '@config'
import { TransportType } from '@models'
const { paramsError } = config.message;

export const transportTypeValidationById = async (id = '') => {
    const transportTypeValidation = await TransportType.findById(id);
    if (!transportTypeValidation) {
        throw new Error(`${paramsError.msg}`)
    }
};