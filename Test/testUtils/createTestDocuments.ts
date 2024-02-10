import { User, Role } from '@models'
import { getTestRoleData, getTestUserData } from '../mockData'

export const createTestDocuments = async () => {
    const role = await Role.create(getTestRoleData())
    const userTestData = await getTestUserData()
    userTestData.role = role._id
    const userData = new User(userTestData)
    await userData.save()
    return { userData }
}