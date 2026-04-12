import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export const getStudentsList = async (queryParams: { [key: string]: string | undefined }, page: number) => {
  const query: Prisma.StudentWhereInput = {};
  const orderBy: Prisma.StudentOrderByWithRelationInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "classId":
            query.classId = parseInt(value);
            break;
          case "search":
            query.OR = [
              { name: { contains: value, mode: "insensitive" } },
              { surname: { contains: value, mode: "insensitive" } },
              { username: { contains: value, mode: "insensitive" } },
            ];
            break;
          case "sort":
            const [field, order] = value.split(":");
            if (field === "name") {
              orderBy.name = order as Prisma.SortOrder;
            } else if (field === "username") {
              orderBy.username = order as Prisma.SortOrder;
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  return { data, count };
};

export const getStudentById = async (id: string) => {
  return await prisma.student.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });
};
export const getStudentClass = async (studentId: string) => {
  return await prisma.class.findFirst({
    where: {
      students: { some: { id: studentId } },
    },
  });
};
