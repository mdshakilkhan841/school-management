import CountChart from "./CountChart";
import { getStudentGenderStats } from "@/services/dashboardService";
import { MoreHorizontal } from "lucide-react";

const CountChartContainer = async () => {
  const { boys, girls, total } = await getStudentGenderStats();

  return (
    <div className="rounded-xl w-full h-full p-4" style={{ backgroundColor: "var(--theme-surface)" }}>
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold" style={{ color: "var(--theme-text)" }}>Students</h1>
        <MoreHorizontal size={20} style={{ color: "var(--theme-text-secondary)" }} />
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold" style={{ color: "var(--theme-text)" }}>{boys}</h1>
          <h2 className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold" style={{ color: "var(--theme-text)" }}>{girls}</h1>
          <h2 className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
