import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { MoreHorizontal } from "lucide-react";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
  return (
    <div className="p-4 rounded-md" style={{ backgroundColor: "var(--theme-surface)" }}>
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4" style={{ color: "var(--theme-text)" }}>Events</h1>
        <MoreHorizontal size={20} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
