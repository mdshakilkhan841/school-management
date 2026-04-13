import { getEventsByDate } from "@/services/eventService";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await getEventsByDate(date);

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      style={{ borderColor: "var(--theme-border)" }}
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold" style={{ color: "var(--theme-text)" }}>{event.title}</h1>
        <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-sm" style={{ color: "var(--theme-text-secondary)" }}>{event.description}</p>
    </div>
  ));
};

export default EventList;
