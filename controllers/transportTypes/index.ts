import create from "./create.transport.type"
import remove from "./delete.transport.type"
import get from "./get.transport.type.by.id"
import list from "./get.transport.type.list"
import update from "./update.transport.type"

export const createTransportTypeController = create 
export const getTransportTypeByIdController = get
export const listTransportTypesController = list
export const removeTransportTypeController = remove 
export const updateTransportTypeController = update