import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export const getExamsList = async (
  queryParams: { [key: string]: string | undefined },
  page: number,
  role: string,
  currentUserId?: string
) => {
  const query: Prisma.ExamWhereInput = {
    lesson: {},
  };

  const orderBy: Prisma.ExamOrderByWithRelationInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson!.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson!.teacherId = value;
            break;
          case "search":
            query.lesson!.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          case "sort":
            const [field, order] = value.split(":");
            if (field === "title") {
              orderBy.title = order as Prisma.SortOrder;
            } else if (field === "startTime") {
              orderBy.startTime = order as Prisma.SortOrder;
            }
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson!.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson!.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "parent":
      query.lesson!.class = {
        students: {
          some: {
            parentId: currentUserId!,
          },
        },
      };
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);

  return { data, count };
};
