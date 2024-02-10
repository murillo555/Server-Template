import { Schema, model } from "mongoose"
import { Attachment } from "@interfaces/models/attachment"


const AttachmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name of the attachment  is required'],
    },
    category: {
        type: String,
        required: [true, 'The category is required']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'The date of the attachment is required'],
    },
    fileType: {
        type: String,
        required: [true, 'the file type of the string is required']
    },
    file: {
        type: String,
        required: [true, 'The file path is required'],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

AttachmentSchema.methods.toJSON = function () {
    const { __v, ...attachment } = this.toObject()
    return attachment
}

const AttachmentModel = model<Attachment>('Attachment', AttachmentSchema)
export default AttachmentModel