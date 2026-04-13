import AttendanceChart from "./AttendanceChart";
import { getAttendanceStats } from "@/services/dashboardService";
import { MoreHorizontal } from "lucide-react";

const AttendanceChartContainer = async () => {
  const data = await getAttendanceStats();

  return (
    <div className="rounded-lg p-4 h-full" style={{ backgroundColor: "var(--theme-surface)" }}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold" style={{ color: "var(--theme-text)" }}>Attendance</h1>
        <MoreHorizontal size={20} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
      <AttendanceChart data={data}/>
    </div>
  );
};

export default AttendanceChartContainer;
