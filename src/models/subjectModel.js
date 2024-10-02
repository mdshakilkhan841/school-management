import mongoose from "mongoose";

const { Schema } = mongoose;

const subjectSchema = new Schema(
    {
        subjectCode: {
            type: string,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        teachers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Teacher",
            },
        ],
        lessons: [
            {
                type: Schema.Types.ObjectId,
                ref: "Lesson",
            },
        ],
    },
    { timestamps: true }
);

const Subject =
    mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
