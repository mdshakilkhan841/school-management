import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    present: {
        type: Boolean,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    lessonId: {
        type: Number,
        required: true,
    },
});

export const Attendance =
    mongoose.models.Attendance ||
    mongoose.model("Attendance", attendanceSchema);

export default Attendance;
