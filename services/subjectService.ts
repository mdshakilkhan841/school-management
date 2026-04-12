import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export const getSubjectsList = async (queryParams: { [key: string]: string | undefined }, page: number) => {
  const query: Prisma.SubjectWhereInput = {};

  const orderBy: Prisma.SubjectOrderByWithRelationInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          case "sort":
            const [field, order] = value.split(":");
            if (field === "name") {
              orderBy.name = order as Prisma.SortOrder;
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      orderBy: Object.keys(orderBy).length > 0 ? orderBy : { id: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return { data, count };
};
