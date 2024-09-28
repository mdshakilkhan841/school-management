import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    supervisorId: { type: String },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    gradeId: {
        type: Number,
        required: true,
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    announcements: [
        {
            type: Schema.Types.ObjectId,
            ref: "Announcement",
        },
    ],
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;
