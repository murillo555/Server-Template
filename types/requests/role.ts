export interface CreateRoleBody {
    role: string
    createPermissions?: string[]
    updatePermissions?: string[]
    deletePermissions?: string[]
    readPermissions?: string[]
}
