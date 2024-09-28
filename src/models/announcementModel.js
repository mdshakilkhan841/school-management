import mongoose from "mongoose";
const { Schema } = mongoose;

const announcementSchema = new Schema({
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
    date: {
        type: Date,
        required: true,
    },
    classId: {
        type: Number,
    },
});

export const Announcement =
    mongoose.models.Announcement ||
    mongoose.model("Announcement", announcementSchema);

export default Announcement;
