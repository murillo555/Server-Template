import { Schema, model } from 'mongoose';
import config from '@config'
import { Role } from "@interfaces/models/role"
const { permissionList } = config

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    },
    createPermissions: {
        type: [String],
        enum: permissionList,
        default: [],
    },
    updatePermissions: {
        type: [String],
        enum: permissionList,
        default: []
    },
    deletePermissions: {
        type: [String],
        enum: permissionList,
        default: []

    },
    readPermissions: {
        type: [String],
        enum: permissionList,
        default: []
    },
    priority: {
        type: String,
        enum: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'default'],
        default: 'default'

    },
    index: {
        type: Number,
    }
});

RoleSchema.methods.toJSON = function () {
    const { __v, ...role } = this.toObject()
    return role
}

const roleModel = model<Role>('Role', RoleSchema);
export default roleModel