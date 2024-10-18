import connectDB from "@/lib/mongoose";
import Admin from "@/models/adminModel";
import Parent from "@/models/parentModel";
import Student from "@/models/studentModel";
import Teacher from "@/models/teacherModel";

await connectDB();

export const getTotalUsers = async (type) => {
    try {
        const model = {
            admin: Admin,
            teacher: Teacher,
            student: Student,
            parent: Parent,
        };
        const totalCount = await model[type].countDocuments();
        return totalCount;
    } catch (error) {
        console.log("🚀 ~ getTotalUsers ~ error:", error.message);
    }
};
