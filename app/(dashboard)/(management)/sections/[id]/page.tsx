import FormContainer from "@/components/forms/FormContainer";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
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
                        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <Image
                            src="/arrow-left.png"
                            alt=""
                            width={16}
                            height={16}
                        />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Section {section.name}
                            </h1>
                            <span className="px-2 py-0.5 bg-lamaPurpleLight text-lamaPurple text-[10px] font-bold uppercase rounded-md">
                                General
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Image
                                src="/class.png"
                                alt=""
                                width={14}
                                height={14}
                                className="opacity-50"
                            />
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
                <div className="bg-white p-4 rounded-md border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-lamaYellowLight flex items-center justify-center">
                        <Image
                            src="/teacher.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-gray-400 font-bold block">
                            Class Teacher
                        </span>
                        <span className="font-semibold text-gray-800">
                            {section.supervisor
                                ? `${section.supervisor.name} ${section.supervisor.surname}`
                                : "None"}
                        </span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-lamaSkyLight flex items-center justify-center">
                        <Image
                            src="/student.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-gray-400 font-bold block">
                            Total Students
                        </span>
                        <span className="font-semibold text-gray-800">
                            {section._count.students}
                        </span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md border border-gray-100 flex items-center gap-4 opacity-50">
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                        <Image
                            src="/singleBranch.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-gray-400 font-bold block">
                            Assigned Room
                        </span>
                        <span className="font-semibold text-gray-800">
                            Unassigned
                        </span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md border border-gray-100 flex items-center gap-4 opacity-50">
                    <div className="w-12 h-12 rounded-md bg-lamaPurpleLight flex items-center justify-center">
                        <Image
                            src="/result.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-gray-400 font-bold block">
                            Utilization
                        </span>
                        <span className="font-semibold text-gray-800">N/A</span>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-8 border-b border-gray-100 px-2">
                {["overview", "students", "timetable", "settings"].map((t) => (
                    <Link
                        key={t}
                        href={`?tab=${t}`}
                        className={`pb-3 text-sm font-semibold capitalize transition-all ${
                            tab === t
                                ? "text-gray-900 border-b-2 border-lamaSky"
                                : "text-gray-400 hover:text-gray-600"
                        }`}
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
                            <div className="bg-white p-8 rounded-md border border-gray-100 relative group">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-gray-800">
                                        Assigned Room
                                    </h2>
                                    <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100">
                                        <Image
                                            src="/singleBranch.png"
                                            alt=""
                                            width={20}
                                            height={20}
                                            className="opacity-40"
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mb-8 max-w-[280px]">
                                    No room currently assigned to this section.
                                    Assign a room to handle physical location
                                    mapping.
                                </p>
                                <button className="px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-md uppercase tracking-wide hover:bg-gray-800 transition-colors">
                                    Assign Room
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: TEACHER CARD */}
                        <div className="w-full lg:w-1/3">
                            <div
                                className={`p-6 rounded-xl border border-gray-100 flex flex-col gap-6 ${section.supervisor ? "bg-white" : "bg-orange-50 border-orange-100"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.supervisor ? "bg-lamaYellowLight" : "bg-white border border-orange-100"}`}
                                    >
                                        <Image
                                            src="/teacher.png"
                                            alt=""
                                            width={24}
                                            height={24}
                                        />
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
                                        className={`text-xs font-bold uppercase tracking-wider ${section.supervisor ? "text-gray-400" : "text-orange-300"}`}
                                    >
                                        Class Teacher
                                    </h3>
                                    {section.supervisor ? (
                                        <div className="mt-4 flex flex-col gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 overflow-hidden">
                                                    <Image
                                                        src={
                                                            section.supervisor
                                                                .img ||
                                                            "/noAvatar.png"
                                                        }
                                                        alt=""
                                                        width={64}
                                                        height={64}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900 leading-tight">
                                                        {
                                                            section.supervisor
                                                                .name
                                                        }{" "}
                                                        {
                                                            section.supervisor
                                                                .surname
                                                        }
                                                    </h4>
                                                    <p className="text-xs text-gray-400 font-medium">
                                                        #{section.supervisor.id}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/teachers/${section.supervisor.id}`}
                                                className="w-full py-2 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest text-center rounded-md hover:bg-gray-100 transition-colors"
                                            >
                                                View Complete Profile
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="mt-4 p-8 border-2 border-dashed border-orange-100 rounded-xl flex flex-col items-center justify-center text-center bg-white/50">
                                            <div className="w-10 h-10 rounded-full bg-orange-100/50 flex items-center justify-center mb-3">
                                                <Image
                                                    src="/teacher.png"
                                                    alt=""
                                                    width={16}
                                                    height={16}
                                                    className="opacity-30"
                                                />
                                            </div>
                                            <p className="text-sm font-bold text-orange-400">
                                                No Teacher Assigned
                                            </p>
                                            <p className="text-[10px] text-orange-300 mt-1 max-w-[150px]">
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
                    <div className="bg-white p-6 rounded-md border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 leading-none">
                                    Students Roster
                                </h2>
                                <p className="text-xs text-gray-400 mt-2 font-medium">
                                    Total {students.length} students assigned
                                </p>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs outline-none focus:ring-1 focus:ring-lamaSky w-64"
                                />
                                <Image
                                    src="/search.png"
                                    alt=""
                                    width={14}
                                    height={14}
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-30"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            {students.map((student, idx) => (
                                <Link
                                    href={`/students/${student.id}`}
                                    key={student.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold text-gray-300 w-4">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-lamaSkyLight flex items-center justify-center text-[10px] font-bold text-lamaSky group-hover:bg-lamaSky group-hover:text-white transition-colors">
                                            {student.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm text-gray-700 group-hover:text-lamaSky transition-colors">
                                            {student.name} {student.surname}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase px-2 py-1 bg-gray-50 rounded-md">
                                        #{student.id}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "timetable" && (
                    <div className="bg-white p-6 rounded-md border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-gray-800 leading-none">
                                Weekly Timetable
                            </h2>
                            <p className="text-xs text-gray-400 mt-2 font-medium">
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
                                                <Image
                                                    src="/calendar.png"
                                                    alt=""
                                                    width={14}
                                                    height={14}
                                                    className="opacity-40"
                                                />
                                                <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                                                    {day}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-bold">
                                                {dayLessons.length} Classes
                                            </span>
                                        </div>
                                        <div className="bg-gray-50/50 p-2 rounded-md border border-gray-100 flex-1 flex flex-col gap-2">
                                            {dayLessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className="bg-white p-3 border border-gray-100 rounded-md shadow-sm flex flex-col gap-1"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-[10px] font-bold text-lamaSky">
                                                            Period{" "}
                                                            {lesson.id % 8 || 1}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-gray-400">
                                                            {lesson.startTime.toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-bold text-sm text-gray-800 leading-tight">
                                                        {lesson.subject.name}
                                                    </h4>
                                                    <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
                                                        <span className="w-1 h-1 rounded-full bg-lamaSky"></span>
                                                        {lesson.teacher.name}{" "}
                                                        {lesson.teacher.surname}
                                                    </p>
                                                </div>
                                            ))}
                                            {dayLessons.length === 0 && (
                                                <div className="flex-1 flex items-center justify-center">
                                                    <p className="text-xs text-gray-300 italic font-medium">
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
                        <div className="bg-white p-8 rounded-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-8 leading-none">
                                General Settings
                            </h2>
                            <FormContainer
                                table="section"
                                type="update"
                                data={section}
                            />
                        </div>

                        <div className="bg-red-50 p-8 rounded-sm border border-red-100">
                            <h3 className="text-md font-bold text-red-700 leading-none">
                                Danger Zone
                            </h3>
                            <p className="text-xs text-red-500/80 mt-2 font-medium">
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
