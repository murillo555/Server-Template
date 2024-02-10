import dayjs from "dayjs"
import bcrypt from "bcryptjs"
import { CreateUserBody } from '@interfaces/requests/user'

export const getTestUser = async () => {
    const salt = await bcrypt.genSaltSync();
    const password = await bcrypt.hashSync('123456', salt);
    const birthDate = dayjs('11/14/1995').toDate()
    let TestUser = {
        firstName: "Test",
        lastName: "TestLastName",
        email: "test@domain.com",
        password: password,
        entryDate: dayjs().toDate(),
        birthDate: birthDate
    } as CreateUserBody

    return TestUser
}

