import mongoose from "mongoose";
const { Schema } = mongoose;

const assignmentSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    dueDate: {
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
});

const Assignment =
    mongoose.models.Assignment ||
    mongoose.model("Assignment", assignmentSchema);

export default Assignment;
