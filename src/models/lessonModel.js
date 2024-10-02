import mongoose from "mongoose";

const { Schema } = mongoose;

const lessonSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        day: {
            type: String,
            enum: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"],
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
        subjectId: {
            type: Number,
            required: true,
        },
        classId: {
            type: Number,
            required: true,
        },
        teacherId: {
            type: String,
            required: true,
        },
        exams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Exam",
            },
        ],
        assignments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Assignment",
            },
        ],
        attendances: [
            {
                type: Schema.Types.ObjectId,
                ref: "Attendance",
            },
        ],
    },
    { timestamps: true }
);

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

export default Lesson;
