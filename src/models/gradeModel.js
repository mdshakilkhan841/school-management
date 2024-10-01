import mongoose from "mongoose";

const { Schema } = mongoose;

const gradeSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        level: {
            type: Number,
            required: true,
            unique: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        classes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Class",
            },
        ],
    },
    { timestamps: true }
);

const Grade = mongoose.models.Grade || mongoose.model("Grade", gradeSchema);

export default Grade;
