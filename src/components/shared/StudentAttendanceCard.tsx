import { getStudentAttendancePercentage } from "@/services/attendanceService";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const percentage = await getStudentAttendancePercentage(id);

  return (
    <div className="">
      <h1 className="text-xl font-semibold">{percentage || "-"}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
