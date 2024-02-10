import { User, Role } from '@models'

export const removeTestDocuments = async () => {
    await Role.deleteMany({})
    await User.deleteMany({})
}