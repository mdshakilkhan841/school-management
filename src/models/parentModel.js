import mongoose from "mongoose";

const { Schema } = mongoose;

const parentSchema = new Schema(
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
            enum: ["PARENT"],
            default: "PARENT",
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
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
    },
    { timestamps: true }
);

const Parent = mongoose.models.Parent || mongoose.model("Parent", parentSchema);

export default Parent;
