import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({ type, id }) => {
    const dataRes = await prisma.lesson.findMany({
        where: {
            ...(type === "teacherId" ? { teacherId: id } : { classId: id }),
        },
    });

    const data = dataRes.map((lesson) => ({
        title: lesson.name,
        start: lesson.startTime,
        end: lesson.endTime,
    }));

    const schedule = adjustScheduleToCurrentWeek(data);

    return (
        <div className="">
            <BigCalendar data={schedule} />
        </div>
    );
};

export default BigCalendarContainer;
