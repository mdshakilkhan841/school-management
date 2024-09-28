import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
