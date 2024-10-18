import connectDB from "@/lib/mongoose";
import User from "@/models/userModel";

await connectDB();

export async function getAnnouncements(userId, role) {
    try {
        // Role-based pipeline selection
        const pipelines = {
            student: studentPipeline(userId, role),
            parent: parentPipeline(userId, role),
            teacher: teacherPipeline(userId, role),
        };

        // Execute the appropriate pipeline
        const announcements = await User.aggregate(pipelines[role] || []);
        console.log("🚀 ~ getAnnouncements ~ announcements:", announcements);

        return announcements;
    } catch (error) {
        console.log("🚀 ~ getAnnouncements ~ error:", error);
    }
}

// Student Pipeline
function studentPipeline(userId, role) {
    return [
        {
            $match: {
                userId: userId,
            },
        },
        {
            $lookup: {
                from: `${role}s`,
                localField: "userId",
                foreignField: `${role}Id`,
                as: "userInfo",
            },
        },
        {
            $unwind: {
                path: "$userInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$userInfo",
            },
        },
        {
            $lookup: {
                from: "announcements",
                localField: "class",
                foreignField: "class",
                as: "announcementInfo",
            },
        },
        {
            $unwind: {
                path: "$announcementInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$announcementInfo",
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
        {
            $limit: 3,
        },
    ];
}

// Parent Pipeline
function parentPipeline(userId, role) {
    return [
        {
            $match: {
                userId: userId,
            },
        },
        {
            $lookup: {
                from: `${role}s`,
                localField: "userId",
                foreignField: `${role}Id`,
                as: "userInfo",
            },
        },
        {
            $unwind: {
                path: "$userInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$userInfo",
            },
        },
        {
            $lookup: {
                from: "students",
                localField: "students",
                foreignField: "_id",
                as: "studentInfo",
            },
        },
        {
            $unwind: {
                path: "$studentInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$studentInfo",
            },
        },
        {
            $lookup: {
                from: "announcements",
                localField: "class",
                foreignField: "class",
                as: "announcementInfo",
            },
        },
        {
            $group: {
                _id: "$class",
                announcementInfo: {
                    $first: "$$ROOT.announcementInfo",
                },
            },
        },
        {
            $unwind: {
                path: "$announcementInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$announcementInfo",
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
        {
            $limit: 3,
        },
    ];
}

// Teacher Pipeline
function teacherPipeline(userId, role) {
    return [
        {
            $match: {
                userId: userId,
            },
        },
        {
            $lookup: {
                from: `${role}s`,
                localField: "userId",
                foreignField: `${role}Id`,
                as: "userInfo",
            },
        },
        {
            $unwind: {
                path: "$userInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$userInfo",
            },
        },
        {
            $lookup: {
                from: "classes",
                localField: "classes",
                foreignField: "_id",
                as: "classInfo",
            },
        },
        {
            $unwind: {
                path: "$classInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $lookup: {
                from: "announcements",
                localField: "classInfo.announcements",
                foreignField: "_id",
                as: "announcementInfo",
            },
        },
        {
            $unwind: {
                path: "$announcementInfo",
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $replaceRoot: {
                newRoot: "$announcementInfo",
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
        {
            $limit: 3,
        },
    ];
}
