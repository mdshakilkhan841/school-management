import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherSchema = new Schema(
    {
        teacherId: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["TEACHER"],
            default: "TEACHER",
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
        },
        sex: {
            type: String,
            enum: ["MALE", "FEMALE"],
            required: true,
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
    },
    { timestamps: true }
);

const Teacher =
    mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
