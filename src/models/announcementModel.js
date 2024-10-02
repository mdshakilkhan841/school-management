import mongoose from "mongoose";
const { Schema } = mongoose;

const announcementSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            // required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        classId: {
            type: Number,
        },
    },
    { timestamps: true }
);

export const Announcement =
    mongoose.models.Announcement ||
    mongoose.model("Announcement", announcementSchema);

export default Announcement;
