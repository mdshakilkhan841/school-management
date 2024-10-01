import mongoose from "mongoose";

const { Schema } = mongoose;

const examSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
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
        lessonId: {
            type: Number,
            required: true,
        },
        results: [
            {
                type: Schema.Types.ObjectId,
                ref: "Result",
            },
        ],
    },
    { timestamps: true }
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;
