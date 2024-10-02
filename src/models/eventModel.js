import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
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
    },
    { timestamps: true }
);

export const Event =
    mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
