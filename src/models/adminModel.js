import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        refId: {
            type: String,
            unique: true,
        },
        adminId: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["ADMIN"],
            default: "ADMIN",
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
        img: { type: String },
        bloodType: {
            type: String,
        },
        sex: {
            type: String,
            enum: ["MALE", "FEMALE"],
        },
        birthday: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
