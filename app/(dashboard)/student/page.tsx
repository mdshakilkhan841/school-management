import Announcements from "@/components/dashboard/Announcements";
import BigCalendarContainer from "@/components/calendar/BigCalendarContainer";
import EventCalendar from "@/components/dashboard/EventCalendar";
import { getStudentClass } from "@/services/studentService";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const StudentPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id as string;

  const classItem = await getStudentClass(userId);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule ({classItem?.name})</h1>
          <BigCalendarContainer type="classId" id={classItem?.id!} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
