import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema(
    {
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
        role: {
            type: String,
            enum: ["STUDENT"],
            default: "STUDENT",
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
        parentId: {
            type: String,
            required: true,
        },
        classId: {
            type: Number,
            required: true,
        },
        gradeId: {
            type: Number,
            required: true,
        },
        attendances: [
            {
                type: Schema.Types.ObjectId,
                ref: "Attendance",
            },
        ],
        results: [
            {
                type: Schema.Types.ObjectId,
                ref: "Result",
            },
        ],
        birthday: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const Student =
    mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
