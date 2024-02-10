import { Types } from 'mongoose';

export interface CreateUserBody {
    firstName: string
    lastName: string
    email: string
    password: string
    role: Types.ObjectId //mongoID
    entryDate: Date
    birthDate: Date
}


export interface CreateUserAttachmentBody {
    name: string
}

