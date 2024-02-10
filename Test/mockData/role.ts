import dayjs from "dayjs"
import bcrypt from "bcryptjs"

export const getTestRole = () => {
    let TestRole = {
        role: "ADMIN_ROLE",
        createPermissions: [],
        updatePermissions: [],
        deletePermission: [],
        readPermissions: [],
        priority: 'p1'
    }
    return TestRole
}




