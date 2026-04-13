import { getUserCount } from "@/services/dashboardService";
import { MoreHorizontal } from "lucide-react";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const data = await getUserCount(type);

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] px-2 py-1 rounded-full text-green-600" style={{ backgroundColor: "var(--theme-surface)" }}>
          2024/25
        </span>
        <MoreHorizontal size={20} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
      <h1 className="text-2xl font-semibold my-4" style={{ color: "var(--theme-text)" }}>{data}</h1>
      <h2 className="capitalize text-sm font-medium" style={{ color: "var(--theme-text-secondary)" }}>{type}s</h2>
    </div>
  );
};

export default UserCard;
