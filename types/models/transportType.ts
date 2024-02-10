import { User } from "@interfaces/models/user"

export interface TransportType {
    type: String
    defaultLoad?: Number
    defaultWidth?: Number
    defaultLength?: Number
    updatedBy: User
    createdBy: User
}   
