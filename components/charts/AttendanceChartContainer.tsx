import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import { getAttendanceStats } from "@/services/dashboardService";

const AttendanceChartContainer = async () => {
  const data = await getAttendanceStats();

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data}/>
    </div>
  );
};

export default AttendanceChartContainer;
