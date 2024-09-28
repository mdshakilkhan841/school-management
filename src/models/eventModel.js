import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    classId: {
        type: Number,
    },
});

export const Event =
    mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
