import { Schema, model } from 'mongoose';
import { TransportType } from '@interfaces/models/transportType';

const TransportTypeSchema = new Schema({
    type: {
        type: String,
        required: [true, 'The FirstName is Required'],
    },
    defaultLoad: {
        type: Number,
    },
    defaultWidth: {
        type: Number,
    },
    defaultLength: {
        type: Number,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

TransportTypeSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject()
    return user
}

const transportTypeModel = model<TransportType>('TrasnportType', TransportTypeSchema)
export default transportTypeModel;