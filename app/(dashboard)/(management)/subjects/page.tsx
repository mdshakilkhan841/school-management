import FormContainer from "@/components/forms/FormContainer";
import Pagination from "@/components/list/Pagination";
import Table from "@/components/list/Table";
import TableSearch from "@/components/list/TableSearch";
import FilterAndSort from "@/components/list/FilterSort";
import { getSubjectsList } from "@/services/subjectService";
import { Subject, Teacher } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BookOpen, Users, LayoutGrid, BookMarked } from "lucide-react";

type SubjectList = Subject & { teachers: Teacher[] };

const SubjectListPage = async (props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const searchParams = await props.searchParams;
    const session = await auth.api.getSession({ headers: await headers() });
    const role = session?.user?.role as string;

    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    // Fetch Subject Data
    const { data, count } = await getSubjectsList(queryParams, p);

    // Aggregate Stats (matching Classes page pattern)
    const totalSubjects = count;
    const totalTeachers = await prisma.teacher.count({
        where: { subjects: { some: {} } },
    });
    const totalLessons = await prisma.lesson.count();
    const mockDepartments = 0; // Schema doesn't have departments yet

    const columns = [
        {
            header: "Subject Name",
            accessor: "name",
        },
        {
            header: "Teachers",
            accessor: "teachers",
            className: "hidden md:table-cell",
        },
        {
            header: "Department",
            accessor: "department",
            className: "hidden md:table-cell",
        },
        {
            header: "Actions",
            accessor: "action",
        },
    ];

    const renderRow = (item: SubjectList) => (
        <tr
            key={item.id}
            className="text-sm hover:bg-lamaSkyLight transition-colors list-row-hover"
            style={{ borderBottom: "1px solid var(--theme-border)" }}
        >
            <td className="p-4">
                <div className="flex flex-col gap-1">
                    <span
                        className="font-bold"
                        style={{ color: "var(--theme-text)" }}
                    >
                        {item.name}
                    </span>
                    <span
                        className="text-[10px] opacity-60"
                        style={{ color: "var(--theme-text-secondary)" }}
                    >
                        Code: {item.name.substring(0, 3).toUpperCase()}
                        {item.id}
                    </span>
                </div>
            </td>
            <td className="hidden md:table-cell p-4">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {item.teachers.slice(0, 3).map((teacher) => (
                            <div
                                key={teacher.id}
                                className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-[8px] font-bold"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                    color: "var(--theme-text)",
                                }}
                            >
                                {teacher.name[0]}
                            </div>
                        ))}
                    </div>
                    <span
                        className="text-xs"
                        style={{ color: "var(--theme-text-secondary)" }}
                    >
                        {item.teachers.length > 0
                            ? `${item.teachers.length} Assigned`
                            : "No teachers"}
                    </span>
                </div>
            </td>
            <td className="hidden md:table-cell p-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span
                        className="text-xs font-medium"
                        style={{ color: "var(--theme-text-secondary)" }}
                    >
                        General
                    </span>
                </div>
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormContainer
                                table="subject"
                                type="update"
                                data={item}
                            />
                            <FormContainer
                                table="subject"
                                type="delete"
                                id={item.id}
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="flex-1 m-4 flex flex-col gap-4">
            {/* STATS CARDS (Standard UI Theme) */}
            <div className="flex gap-4 justify-between flex-wrap">
                {/* Total Subjects */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaPurpleLight">
                        <BookMarked
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Total Subjects
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {totalSubjects}
                        </h1>
                    </div>
                </div>

                {/* Total Teachers */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaYellowLight">
                        <Users
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Field Experts
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {totalTeachers}
                        </h1>
                    </div>
                </div>

                {/* Total Lessons */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaSkyLight">
                        <BookOpen
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Active Lessons
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {totalLessons}
                        </h1>
                    </div>
                </div>

                {/* Mock Departments */}
                <div
                    className="rounded-xl p-4 flex-1 min-w-[200px] flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-lamaPurpleLight">
                        <LayoutGrid
                            size={24}
                            style={{ color: "var(--theme-text)" }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Departments
                        </span>
                        <h1
                            className="text-lg font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {mockDepartments}
                        </h1>
                    </div>
                </div>
            </div>

            {/* LIST SECTION (Standard UI Theme) */}
            <div
                className="p-4 rounded-md flex-1"
                style={{ backgroundColor: "var(--theme-surface)" }}
            >
                {/* TOP BAR */}
                <div className="flex items-center justify-between mb-4">
                    <h1
                        className="hidden md:block text-lg font-bold"
                        style={{ color: "var(--theme-text)" }}
                    >
                        Subject Management
                    </h1>
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <FilterAndSort sortField="name" />
                            {role === "admin" && (
                                <FormContainer table="subject" type="create" />
                            )}
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <Table columns={columns} renderRow={renderRow} data={data} />

                {/* PAGINATION */}
                <Pagination page={p} count={count} />
            </div>
        </div>
    );
};

export default SubjectListPage;
