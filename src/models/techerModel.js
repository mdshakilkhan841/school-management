import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
    },
    address: {
        type: String,
        required: true,
    },
    img: { type: String },
    bloodType: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
    classes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Class",
        },
    ],
    birthday: {
        type: Date,
        required: true,
    },
});

const Teacher =
    mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
