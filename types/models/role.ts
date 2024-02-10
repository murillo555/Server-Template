export interface Role {
    role: string
    createPermissions: string[]
    updatePermissions: string[]
    deletePermissions: string[]
    readPermissions: string[]
    priority: string
    index: number
}

