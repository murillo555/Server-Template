import { User } from "@interfaces/models/user"

export interface TimeLine {
    date: Date
    actionType: string
    target: string
    actionDescription: string
    actionBy: User
}   
