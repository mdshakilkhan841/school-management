import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export const getTeachersList = async (queryParams: { [key: string]: string | undefined }, page: number) => {
  const query: Prisma.TeacherWhereInput = {};
  const orderBy: Prisma.TeacherOrderByWithRelationInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
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
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  return { data, count };
};

export const getTeacherById = async (id: string) => {
  return await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
};
