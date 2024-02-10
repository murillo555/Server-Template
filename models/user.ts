import { Schema, model } from 'mongoose';
import { User } from "@interfaces/models/user"

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'The FirstName is Required'],
    },
    lastName: {
        type: String,
        required: [true, 'The Last Name is Required'],
    },
    email: {
        type: String,
        required: [true, 'The Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The Password is Required'],
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
    entryDate: {
        type: Date,
        required: ['The User Entry date is Required'],
    },
    birthDate: {
        type: Date,
        required: ['The User Birthdate is Required'],
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Attachment'
    },

    attachments: {
        type: [Schema.Types.ObjectId],
        ref: 'Attachment'
    },
    status: {
        type: Boolean,
        default: true,
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject()
    return user
}

const userModel = model<User>('User', UserSchema)
export default userModel;