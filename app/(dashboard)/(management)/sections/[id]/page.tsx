import FormContainer from "@/components/forms/FormContainer";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ArrowLeft, School, GraduationCap, Users, GitBranch, BarChart3, Search, CalendarDays } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

const SectionViewPage = async (props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab?: string }>;
}) => {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { id } = params;
    const tab = searchParams.tab || "overview";

    const session = await auth.api.getSession({ headers: await headers() });
    const role = session?.user?.role as string;

    const section = await prisma.section.findUnique({
        where: { id: parseInt(id) },
        include: {
            supervisor: true,
            class: true,
            _count: {
                select: { students: true },
            },
        },
    });

    if (!section) return notFound();

    // Fetch context-specific data
    const students = await prisma.student.findMany({
        where: { sectionId: section.id },
        orderBy: { name: "asc" },
    });

    const lessons = await prisma.lesson.findMany({
        where: { sectionId: section.id },
        include: {
            subject: true,
            teacher: true,
        },
    });

    const days = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];

    return (
        <div className="flex-1 p-4 flex flex-col gap-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/classes"
                        className="w-10 h-10 flex items-center justify-center rounded-md border transition-colors"
                        style={{
                            borderColor: "var(--theme-border)",
                            color: "var(--theme-text)",
                        }}
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1
                                className="text-2xl font-bold"
                                style={{ color: "var(--theme-text)" }}
                            >
                                Section {section.name}
                            </h1>
                            <span className="px-2 py-0.5 bg-lamaPurpleLight text-lamaPurple text-[10px] font-bold uppercase rounded-md">
                                General
                            </span>
                        </div>
                        <p
                            className="text-sm mt-1 flex items-center gap-2"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            <School size={14} className="opacity-50" />
                            Class: {section.class.name} • Level{" "}
                            {section.class.level} • ID: {section.id}
                        </p>
                    </div>
                </div>
                {role === "admin" && (
                    <div className="flex items-center gap-2">
                        <FormContainer
                            table="section"
                            type="delete"
                            id={section.id.toString()}
                        />
                    </div>
                )}
            </div>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                    className="rounded-xl p-4 flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 rounded-md bg-lamaYellowLight flex items-center justify-center">
                        <GraduationCap size={24} style={{ color: "var(--theme-text)" }} />
                    </div>
                    <div>
                        <span
                            className="text-[10px] uppercase font-bold block"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Class Teacher
                        </span>
                        <span
                            className="font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {section.supervisor
                                ? `${section.supervisor.name} ${section.supervisor.surname}`
                                : "None"}
                        </span>
                    </div>
                </div>
                <div
                    className="rounded-xl p-4 flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 rounded-md bg-lamaSkyLight flex items-center justify-center">
                        <Users size={24} style={{ color: "var(--theme-text)" }} />
                    </div>
                    <div>
                        <span
                            className="text-[10px] uppercase font-bold block"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Total Students
                        </span>
                        <span
                            className="font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {section._count.students}
                        </span>
                    </div>
                </div>
                <div
                    className="rounded-xl p-4 flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 rounded-md bg-lamaSkyLight flex items-center justify-center">
                        <GitBranch size={24} style={{ color: "var(--theme-text)" }} />
                    </div>
                    <div>
                        <span
                            className="text-[10px] uppercase font-bold block"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Assigned Room
                        </span>
                        <span
                            className="font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            Unassigned
                        </span>
                    </div>
                </div>
                <div
                    className="rounded-xl p-4 flex items-center gap-4 border"
                    style={{
                        backgroundColor: "var(--theme-surface)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="w-12 h-12 rounded-md bg-lamaPurpleLight flex items-center justify-center">
                        <BarChart3 size={24} style={{ color: "var(--theme-text)" }} />
                    </div>
                    <div>
                        <span
                            className="text-[10px] uppercase font-bold block"
                            style={{ color: "var(--theme-text-secondary)" }}
                        >
                            Utilization
                        </span>
                        <span
                            className="font-semibold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            N/A
                        </span>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div
                className="flex items-center gap-8 px-2"
                style={{ borderBottom: "1px solid var(--theme-border)" }}
            >
                {["overview", "students", "timetable", "settings"].map((t) => (
                    <Link
                        key={t}
                        href={`?tab=${t}`}
                        className="pb-3 text-sm font-semibold capitalize transition-all"
                        style={{
                            color: tab === t ? "var(--theme-text)" : "var(--theme-text-secondary)",
                            borderBottom: tab === t ? "2px solid var(--theme-primary)" : "2px solid transparent",
                        }}
                    >
                        {t}
                    </Link>
                ))}
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1">
                {tab === "overview" && (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* LEFT: ROOM CARD */}
                        <div className="flex-1 flex flex-col gap-6">
                            <div
                                className="p-8 rounded-md border relative group"
                                style={{
                                    backgroundColor: "var(--theme-surface)",
                                    borderColor: "var(--theme-border)",
                                }}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2
                                        className="text-lg font-bold"
                                        style={{ color: "var(--theme-text)" }}
                                    >
                                        Assigned Room
                                    </h2>
                                    <div
                                        className="w-10 h-10 rounded-md flex items-center justify-center border"
                                        style={{
                                            backgroundColor: "var(--theme-surface-alt)",
                                            borderColor: "var(--theme-border)",
                                        }}
                                    >
                                        <GitBranch size={20} className="opacity-40" style={{ color: "var(--theme-text-secondary)" }} />
                                    </div>
                                </div>
                                <p
                                    className="text-sm mb-8 max-w-[280px]"
                                    style={{ color: "var(--theme-text-secondary)" }}
                                >
                                    No room currently assigned to this section.
                                    Assign a room to handle physical location
                                    mapping.
                                </p>
                                <button
                                    className="px-6 py-2 text-xs font-bold rounded-md uppercase tracking-wide transition-colors"
                                    style={{
                                        backgroundColor: "var(--theme-text)",
                                        color: "var(--theme-bg)",
                                    }}
                                >
                                    Assign Room
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: TEACHER CARD */}
                        <div className="w-full lg:w-1/3">
                            <div
                                className="p-6 rounded-xl border flex flex-col gap-6"
                                style={{
                                    backgroundColor: section.supervisor ? "var(--theme-surface)" : undefined,
                                    borderColor: section.supervisor ? "var(--theme-border)" : "rgba(251, 146, 60, 0.3)",
                                    ...(section.supervisor ? {} : { backgroundColor: "rgba(255, 237, 213, 0.1)" }),
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.supervisor ? "bg-lamaYellowLight" : ""}`}
                                        style={{
                                            backgroundColor: section.supervisor ? undefined : "var(--theme-surface)",
                                            borderColor: section.supervisor ? undefined : "rgba(251, 146, 60, 0.3)",
                                            border: section.supervisor ? undefined : "1px solid rgba(251, 146, 60, 0.3)",
                                        }}
                                    >
                                        <GraduationCap size={24} style={{ color: "var(--theme-text)" }} />
                                    </div>
                                    {role === "admin" && (
                                        <FormContainer
                                            table="section"
                                            type="update"
                                            data={section}
                                            variant="assign"
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <h3
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{
                                            color: section.supervisor
                                                ? "var(--theme-text-secondary)"
                                                : "rgba(251, 146, 60, 0.7)",
                                        }}
                                    >
                                        Class Teacher
                                    </h3>
                                    {section.supervisor ? (
                                        <div className="mt-4 flex flex-col gap-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-16 h-16 rounded-full border overflow-hidden"
                                                    style={{
                                                        backgroundColor: "var(--theme-surface-alt)",
                                                        borderColor: "var(--theme-border)",
                                                    }}
                                                >
                                                <img 
                                                    src={section.supervisor.img || "/noAvatar.png"}
                                                    alt=""
                                                    width={64}
                                                    height={64}
                                                    className="object-cover"
                                                />
                                                </div>
                                                <div>
                                                    <h4
                                                        className="text-lg font-bold leading-tight"
                                                        style={{ color: "var(--theme-text)" }}
                                                    >
                                                        {
                                                            section.supervisor
                                                                .name
                                                        }{" "}
                                                        {
                                                            section.supervisor
                                                                .surname
                                                        }
                                                    </h4>
                                                    <p
                                                        className="text-xs font-medium"
                                                        style={{ color: "var(--theme-text-secondary)" }}
                                                    >
                                                        #{section.supervisor.id}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/teachers/${section.supervisor.id}`}
                                                className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-center rounded-md transition-colors"
                                                style={{
                                                    backgroundColor: "var(--theme-surface-alt)",
                                                    color: "var(--theme-text-secondary)",
                                                    border: "1px solid var(--theme-border)",
                                                }}
                                            >
                                                View Complete Profile
                                            </Link>
                                        </div>
                                    ) : (
                                        <div
                                            className="mt-4 p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center"
                                            style={{
                                                backgroundColor: "var(--theme-surface)",
                                                borderColor: "rgba(251, 146, 60, 0.3)",
                                            }}
                                        >
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(251, 146, 60, 0.15)" }}>
                                                <GraduationCap size={16} className="opacity-30" />
                                            </div>
                                            <p className="text-sm font-bold" style={{ color: "rgba(251, 146, 60, 0.8)" }}>
                                                No Teacher Assigned
                                            </p>
                                            <p className="text-[10px] mt-1 max-w-[150px]" style={{ color: "rgba(251, 146, 60, 0.6)" }}>
                                                Use the assign button at the top
                                                to set a supervisor.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "students" && (
                    <div
                        className="p-6 rounded-md border"
                        style={{
                            backgroundColor: "var(--theme-surface)",
                            borderColor: "var(--theme-border)",
                        }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2
                                    className="text-lg font-bold leading-none"
                                    style={{ color: "var(--theme-text)" }}
                                >
                                    Students Roster
                                </h2>
                                <p
                                    className="text-xs mt-2 font-medium"
                                    style={{ color: "var(--theme-text-secondary)" }}
                                >
                                    Total {students.length} students assigned
                                </p>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="pl-8 pr-4 py-2 border rounded-md text-xs outline-none focus:ring-1 focus:ring-lamaSky w-64"
                                    style={{
                                        backgroundColor: "var(--theme-surface-alt)",
                                        borderColor: "var(--theme-border)",
                                        color: "var(--theme-text)",
                                    }}
                                />
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-30" size={14} style={{ color: "var(--theme-text-secondary)" }} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            {students.map((student, idx) => (
                                <Link
                                    href={`/students/${student.id}`}
                                    key={student.id}
                                    className="flex items-center justify-between p-3 transition-colors last:border-0 group list-row-hover"
                                    style={{
                                        borderBottom: "1px solid var(--theme-border)",
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="text-[10px] font-bold w-4"
                                            style={{ color: "var(--theme-text-secondary)", opacity: 0.5 }}
                                        >
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-lamaSkyLight flex items-center justify-center text-[10px] font-bold text-lamaSky group-hover:bg-lamaSky group-hover:text-white transition-colors">
                                            {student.name.charAt(0)}
                                        </div>
                                        <span
                                            className="font-bold text-sm group-hover:text-lamaSky transition-colors"
                                            style={{ color: "var(--theme-text)" }}
                                        >
                                            {student.name} {student.surname}
                                        </span>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold tracking-tighter uppercase px-2 py-1 rounded-md"
                                        style={{
                                            color: "var(--theme-text-secondary)",
                                            backgroundColor: "var(--theme-surface-alt)",
                                        }}
                                    >
                                        #{student.id}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "timetable" && (
                    <div
                        className="p-6 rounded-md border"
                        style={{
                            backgroundColor: "var(--theme-surface)",
                            borderColor: "var(--theme-border)",
                        }}
                    >
                        <div className="mb-8">
                            <h2
                                className="text-lg font-bold leading-none"
                                style={{ color: "var(--theme-text)" }}
                            >
                                Weekly Timetable
                            </h2>
                            <p
                                className="text-xs mt-2 font-medium"
                                style={{ color: "var(--theme-text-secondary)" }}
                            >
                                Class schedule grouped by day
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {days.map((day) => {
                                const dayLessons = lessons
                                    .filter((l) => l.day === day)
                                    .sort(
                                        (a, b) =>
                                            a.startTime.getTime() -
                                            b.startTime.getTime(),
                                    );
                                return (
                                    <div
                                        key={day}
                                        className="flex flex-col gap-3 min-h-[300px]"
                                    >
                                        <div className="flex items-center justify-between px-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays size={14} className="opacity-40" style={{ color: "var(--theme-text-secondary)" }} />
                                                <span
                                                    className="text-xs font-bold uppercase tracking-wider"
                                                    style={{ color: "var(--theme-text)" }}
                                                >
                                                    {day}
                                                </span>
                                            </div>
                                            <span
                                                className="text-[10px] font-bold"
                                                style={{ color: "var(--theme-text-secondary)" }}
                                            >
                                                {dayLessons.length} Classes
                                            </span>
                                        </div>
                                        <div
                                            className="p-2 rounded-md border flex-1 flex flex-col gap-2"
                                            style={{
                                                backgroundColor: "var(--theme-surface-alt)",
                                                borderColor: "var(--theme-border)",
                                            }}
                                        >
                                            {dayLessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className="p-3 border rounded-md shadow-sm flex flex-col gap-1"
                                                    style={{
                                                        backgroundColor: "var(--theme-surface)",
                                                        borderColor: "var(--theme-border)",
                                                    }}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-[10px] font-bold text-lamaSky">
                                                            Period{" "}
                                                            {lesson.id % 8 || 1}
                                                        </span>
                                                        <span
                                                            className="text-[10px] font-bold"
                                                            style={{ color: "var(--theme-text-secondary)" }}
                                                        >
                                                            {lesson.startTime.toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                    <h4
                                                        className="font-bold text-sm leading-tight"
                                                        style={{ color: "var(--theme-text)" }}
                                                    >
                                                        {lesson.subject.name}
                                                    </h4>
                                                    <p
                                                        className="text-[10px] font-semibold flex items-center gap-1"
                                                        style={{ color: "var(--theme-text-secondary)" }}
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-lamaSky"></span>
                                                        {lesson.teacher.name}{" "}
                                                        {lesson.teacher.surname}
                                                    </p>
                                                </div>
                                            ))}
                                            {dayLessons.length === 0 && (
                                                <div className="flex-1 flex items-center justify-center">
                                                    <p
                                                        className="text-xs italic font-medium"
                                                        style={{ color: "var(--theme-text-secondary)", opacity: 0.5 }}
                                                    >
                                                        No classes scheduled
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {tab === "settings" && (
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <div
                            className="p-8 rounded-sm border"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderColor: "var(--theme-border)",
                            }}
                        >
                            <h2
                                className="text-lg font-bold mb-8 leading-none"
                                style={{ color: "var(--theme-text)" }}
                            >
                                General Settings
                            </h2>
                            <FormContainer
                                table="section"
                                type="update"
                                data={section}
                            />
                        </div>

                        <div
                            className="p-8 rounded-sm border"
                            style={{
                                backgroundColor: "rgba(239, 68, 68, 0.08)",
                                borderColor: "rgba(239, 68, 68, 0.2)",
                            }}
                        >
                            <h3 className="text-md font-bold leading-none" style={{ color: "var(--theme-danger)" }}>
                                Danger Zone
                            </h3>
                            <p className="text-xs mt-2 font-medium" style={{ color: "var(--theme-danger)", opacity: 0.7 }}>
                                Deleting this section will remove all student
                                associations and timetable data.
                            </p>
                            <div className="mt-8">
                                <FormContainer
                                    table="section"
                                    type="delete"
                                    id={section.id.toString()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionViewPage;
