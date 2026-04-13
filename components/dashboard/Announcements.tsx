import { getLatestAnnouncements } from "@/services/announcementService";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const Announcements = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  const role = session?.user?.role as string;

  const data = await getLatestAnnouncements(role, userId);

  return (
    <div className="p-4 rounded-md" style={{ backgroundColor: "var(--theme-surface)" }}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold" style={{ color: "var(--theme-text)" }}>Announcements</h1>
        <span className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data[0] && (
          <div className="bg-lamaSkyLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium" style={{ color: "var(--theme-text)" }}>{data[0].title}</h2>
              <span className="text-xs rounded-md px-1 py-1" style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-text-secondary)" }}>
                {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--theme-text-secondary)" }}>{data[0].description}</p>
          </div>
        )}
        {data[1] && (
          <div className="bg-lamaPurpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium" style={{ color: "var(--theme-text)" }}>{data[1].title}</h2>
              <span className="text-xs rounded-md px-1 py-1" style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-text-secondary)" }}>
                {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--theme-text-secondary)" }}>{data[1].description}</p>
          </div>
        )}
        {data[2] && (
          <div className="bg-lamaYellowLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium" style={{ color: "var(--theme-text)" }}>{data[2].title}</h2>
              <span className="text-xs rounded-md px-1 py-1" style={{ backgroundColor: "var(--theme-surface)", color: "var(--theme-text-secondary)" }}>
                {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--theme-text-secondary)" }}>{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
