import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export const getAttendancesList = async (
  queryParams: any,
  page: number,
  role?: string,
  currentUserId?: string
) => {
  const { sort, ...filters } = queryParams;

  const where: Prisma.AttendanceWhereInput = {};

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            where.studentId = value as string;
            break;
          case "lessonId":
            where.lessonId = parseInt(value as string);
            break;
          case "search":
            where.student = {
              name: { contains: value as string, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE-BASED RESTRICTIONS
  if (role === "teacher") {
    where.lesson = { teacherId: currentUserId! };
  } else if (role === "student") {
    where.studentId = currentUserId!;
  } else if (role === "parent") {
    where.student = { parentId: currentUserId! };
  }

  const [data, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where,
      include: {
        student: true,
        lesson: {
          include: {
            subject: true,
            class: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
      orderBy: sort
        ? { [sort.split(",")[0]]: sort.split(",")[1] as "asc" | "desc" }
        : { date: "desc" },
    }),
    prisma.attendance.count({ where }),
  ]);

  return { data, count };
};

export const getStudentAttendancePercentage = async (studentId: string) => {
  const attendances = await prisma.attendance.findMany({
    where: { studentId },
    select: { present: true },
  });

  if (attendances.length === 0) return 0;

  const presentDays = attendances.filter((a) => a.present).length;
  return Number(((presentDays / attendances.length) * 100).toFixed(2));
};
