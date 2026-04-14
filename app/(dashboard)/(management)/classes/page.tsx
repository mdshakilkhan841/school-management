import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/list/Pagination";
import Table from "@/components/list/Table";
import TableSearch from "@/components/list/TableSearch";
import FilterAndSort from "@/components/list/FilterSort";
import { Class, Section, Teacher } from "@/app/generated/prisma";
import { School, GitBranch, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import ClassRow from "@/components/list/ClassRow";

type AcademicClassList = Class & {
    sections: (Section & { supervisor: Teacher | null })[];
    _count: { students: number };
};

const ClassListPage = async (props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const searchParams = await props.searchParams;
    const session = await auth.api.getSession({ headers: await headers() });
    const role = session?.user?.role as string;

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    const query: any = {};
    if (queryParams.search) {
        query.name = { contains: queryParams.search, mode: "insensitive" };
    }

    const [data, count] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                sections: {
                    include: {
                        supervisor: true,
                    },
                },
                _count: {
                    select: { students: true },
                },
            },
            orderBy: { level: "asc" },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.class.count({ where: query }),
    ]);

    // Aggregate Stats
    const totalClasses = await prisma.class.count();
    const totalSections = await prisma.section.count();

    const sectionRecords = await prisma.section.findMany({
        select: { capacity: true },
    });
    const totalCapacity = sectionRecords.reduce(
        (acc, curr) => acc + curr.capacity,
        0,
    );

    const totalStudents = await prisma.student.count();
    const occupancyRate =
        totalCapacity > 0
            ? ((totalStudents / totalCapacity) * 100).toFixed(1)
            : 0;

    const columns = [
        {
            header: "Class Name",
            accessor: "name",
        },
        {
            header: "Sections",
            accessor: "sections",
            className: "hidden md:table-cell",
        },
        {
            header: "Schedule",
            accessor: "schedule",
            className: "hidden md:table-cell",
        },
        {
            header: "Students",
            accessor: "students",
            className: "hidden md:table-cell",
        },
        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden md:table-cell",
        },
        {
            header: "Stage",
            accessor: "stage",
            className: "hidden lg:table-cell",
        },
        ...(role === "admin"
            ? [
                  {
                      header: "Actions",
                      accessor: "action",
                  },
              ]
            : []),
    ];

    const renderRow = (item: AcademicClassList) => {
        // Sort sections alphabetically to ensure consistent indexing for actions
        const sortedSections = [...item.sections].sort((a, b) =>
            a.name.localeCompare(b.name),
        );

        const classActions = role === "admin" && (
            <>
                <FormContainer table="class" type="update" data={item} />
                <FormContainer
                    table="class"
                    type="delete"
                    id={item.id.toString()}
                />
            </>
        );

        const sectionActions = sortedSections.map(
            (section) =>
                role === "admin" && (
                    <div className="flex items-center gap-2" key={section.id}>
                        <FormContainer
                            table="section"
                            type="update"
                            data={section}
                        />
                        <FormContainer
                            table="section"
                            type="delete"
                            id={section.id}
                        />
                    </div>
                ),
        );

        const sectionAssignButtons = sortedSections.map(
            (section) =>
                role === "admin" &&
                !section.supervisorId && (
                    <FormContainer
                        key={section.id}
                        table="section"
                        type="update"
                        data={section}
                        variant="assign"
                    />
                ),
        );

        const itemWithSortedSections = { ...item, sections: sortedSections };

        return (
            <ClassRow
                key={item.id}
                item={itemWithSortedSections}
                role={role}
                classActions={classActions}
                sectionActions={sectionActions}
                sectionAssignButtons={sectionAssignButtons}
            />
        );
    };

    return (
        <div className="flex-1 m-4 flex flex-col gap-4">
            {/* STATS CARDS */}
            <div className="flex gap-4 justify-between flex-wrap">
                {/* Total Classes */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaPurpleLight">
                        <School
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                            Total Classes
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {totalClasses}
                        </h1>
                    </div>
                </div>

                {/* Total Sections */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaYellowLight">
                        <GitBranch
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                            Total Sections
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {totalSections}
                        </h1>
                    </div>
                </div>

                {/* Seats Capacity */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaSkyLight">
                        <Users
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                            Capacity (Seats)
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {totalCapacity}
                        </h1>
                    </div>
                </div>

                {/* Occupancy Rate */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaSky">
                        <BarChart3
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                            Occupancy Rate
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {occupancyRate}%
                        </h1>
                    </div>
                </div>
            </div>

            <div
                className="p-4 rounded-md flex-1"
                style={{ backgroundColor: "var(--theme-surface)" }}
            >
                {/* TOP */}
                <div className="flex items-center justify-between">
                    <h1
                        className="hidden md:block text-lg font-semibold"
                        style={{ color: "var(--theme-text)" }}
                    >
                        All Academic Classes
                    </h1>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <FilterAndSort sortField="name" />
                            {role === "admin" && (
                                <FormContainer table="class" type="create" />
                            )}
                        </div>
                    </div>
                </div>
                {/* LIST */}
                <Table columns={columns} renderRow={renderRow} data={data} />
                {/* PAGINATION */}
                <Pagination page={p} count={count} />
            </div>
        </div>
    );
};

export default ClassListPage;
