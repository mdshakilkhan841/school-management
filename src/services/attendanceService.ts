import prisma from "@/lib/prisma";

export const getStudentAttendancePercentage = async (studentId: string) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });

  const totalDays = attendance.length;
  const presentDays = attendance.filter((day) => day.present).length;
  const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

  return percentage;
};
