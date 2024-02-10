import { User } from './user'
import { Types } from 'mongoose';
export interface Attachment {
    _id?: Types.ObjectId
    name: string
    category: string
    date: Date
    fileType: string
    file: string
    createdBy: User
    updatedBy?: User
}