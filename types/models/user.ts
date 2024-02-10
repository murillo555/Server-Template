import { Role } from "./role"
import { Types } from 'mongoose';
import { Attachment } from "./attachment"

export interface User {
    _id: number
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
    entryDate: Date | string
    birthDate: Date | string
    updatedBy?: User
    createdBy: User
    image?: Types.ObjectId
    attachments?: Types.ObjectId[]
    status: boolean
}

export interface UserValidated {
    _id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
    entryDate: Date
    birthDate: Date
    updatedBy?: User
    createdBy: User
    image?: Attachment
    attachments?: Attachment[] | string
    status: boolean
}