import mongoose from "mongoose";

const { Schema } = mongoose;

const resultSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    score: {
        type: Number,
        required: true,
    },
    examId: {
        type: Number,
    },
    assignmentId: {
        type: Number,
    },
    studentId: {
        type: String,
        required: true,
    },
});

export const Result =
    mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;
