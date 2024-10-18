import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "teacher", "parent", "admin"],
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
