import connectDB from "@/lib/mongoose";
import Student from "@/models/studentModel";

await connectDB();

export const getStudentsCount = async () => {
    try {
        const studentsCount = await Student.aggregate([
            {
                $group: {
                    _id: "$sex",
                    count: { $sum: 1 },
                },
            },
        ]);
        return studentsCount;
    } catch (error) {
        console.log("🚀 ~ getStudentCount ~ error:", error.message);
    }
};
