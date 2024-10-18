import { getAnnouncements } from "@/controllers/announcement.controller";
import { auth } from "@/auth";
import moment from "moment";

const Announcements = async () => {
    const session = await auth();
    const { userId, role } = session.user;

    const data = await getAnnouncements(userId, role);
    // console.log("🚀 ~ Announcements ~ announcements:", data);

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {data[0] && (
                    <div className="bg-lamaSkyLight rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{data[0].title}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {moment(data[0].date).format("L")}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                            {data[0].description}
                        </p>
                    </div>
                )}
                {data[1] && (
                    <div className="bg-lamaPurpleLight rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{data[1].title}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {moment(data[1].date).format("L")}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                            {data[1].description}
                        </p>
                    </div>
                )}
                {data[2] && (
                    <div className="bg-lamaYellowLight rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{data[2].title}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {moment(data[2].date).format("L")}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                            {data[2].description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcements;
