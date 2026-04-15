import FormContainer from "@/components/forms/FormContainer";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ArrowLeft, School, GraduationCap, Users, GitBranch, BarChart3, Search, CalendarDays, Eye, BookOpen, Clock, Activity, Settings, Sliders, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Table from "@/components/list/Table";

const ClassViewPage = async (props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab?: string }>;
}) => {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { id } = params;
    const tab = searchParams.tab || "overview";

    const session = await auth.api.getSession({ headers: await headers() });
    const role = session?.user?.role as string;

    const classItem = await prisma.class.findUnique({
        where: { id: parseInt(id) },
        include: {
            sections: {
                orderBy: { name: "asc" },
                include: {
                    supervisor: true,
                    _count: {
                        select: { students: true }
                    }
                }
            },
            _count: {
                select: { students: true },
            },
        },
    });

    if (!classItem) return notFound();

    // Calculate dynamic stats
    const totalSections = classItem.sections.length;
    const totalStudents = classItem._count.students;
    const totalCapacity = classItem.sections.reduce((acc, curr) => acc + curr.capacity, 0) || classItem.capacity || 0;
    
    // For "Subjects" tab - actually just unique subjects across all sections/lessons
    const sectionIds = classItem.sections.map(s => s.id);
    const subjects = await prisma.subject.findMany({
        where: {
            lessons: {
                some: {
                    sectionId: { in: sectionIds }
                }
            }
        },
        orderBy: { name: "asc" },
        include: {
            teachers: true
        }
    });

    const columns = {
        sections: [
            { header: "Section", accessor: "name" },
            { header: "Supervisor", accessor: "supervisor", className: "hidden md:table-cell" },
            { header: "Capacity", accessor: "capacity", className: "hidden md:table-cell" },
            { header: "Students", accessor: "students", className: "hidden lg:table-cell" },
            { header: "Actions", accessor: "action" },
        ],
        subjects: [
            { header: "Subject Name", accessor: "name" },
            { header: "Teachers", accessor: "teachers", className: "hidden md:table-cell" },
            { header: "Actions", accessor: "action" },
        ]
    };

    const renderSectionRow = (item: any) => (
        <tr key={item.id} className="text-sm hover:bg-lamaSkyLight transition-colors list-row-hover" style={{ borderBottom: "1px solid var(--theme-border)" }}>
            <td className="flex items-center gap-4 p-4">
                <div className="w-8 h-8 rounded-md bg-lamaSkyLight flex items-center justify-center font-bold" style={{ color: "var(--theme-text)" }}>
                    {item.name}
                </div>
                <span className="font-semibold" style={{ color: "var(--theme-text)" }}>Section {item.name}</span>
            </td>
            <td className="hidden md:table-cell" style={{ color: "var(--theme-text-secondary)" }}>
                {item.supervisor ? `${item.supervisor.name} ${item.supervisor.surname}` : "Unassigned"}
            </td>
            <td className="hidden md:table-cell" style={{ color: "var(--theme-text-secondary)" }}>{item.capacity}</td>
            <td className="hidden lg:table-cell" style={{ color: "var(--theme-text-secondary)" }}>{item._count.students}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`?tab=overview&section=${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky transition-all hover:scale-110">
                            <Eye size={16} style={{ color: "var(--theme-text)" }} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        <FormContainer table="section" type="delete" id={item.id} />
                    )}
                </div>
            </td>
        </tr>
    );

    const renderSubjectRow = (item: any) => (
        <tr key={item.id} className="text-sm hover:bg-lamaSkyLight transition-colors list-row-hover" style={{ borderBottom: "1px solid var(--theme-border)" }}>
            <td className="p-4">
                <span className="font-semibold" style={{ color: "var(--theme-text)" }}>{item.name}</span>
            </td>
            <td className="hidden md:table-cell" style={{ color: "var(--theme-text-secondary)" }}>
                {item.teachers.length > 0 ? item.teachers.map((t: any) => t.name).join(", ") : "None"}
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky transition-all hover:scale-110">
                        <BookOpen size={16} style={{ color: "var(--theme-text)" }} />
                    </button>
                </div>
            </td>
        </tr>
    );

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
                            <h1 className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>
                                Class {classItem.name}
                            </h1>
                            <span className="px-2 py-0.5 bg-lamaPurpleLight text-[10px] font-bold uppercase rounded-md" style={{ color: "var(--theme-primary)" }}>
                                {classItem.stage || "Standard"}
                            </span>
                        </div>
                        <p className="text-sm mt-1 flex items-center gap-2" style={{ color: "var(--theme-text-secondary)" }}>
                            <School size={14} className="opacity-50" />
                            Level {classItem.level} • ID: {classItem.id}
                        </p>
                    </div>
                </div>
                {/* HEADER ACTIONS (Optional) */}
            </div>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl p-4 flex items-center gap-4 border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                    <div className="w-12 h-12 rounded-md bg-lamaPurpleLight flex items-center justify-center text-lamaPurple">
                        <GitBranch size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold block" style={{ color: "var(--theme-text-secondary)" }}>Total Sections</span>
                        <span className="font-semibold text-lg" style={{ color: "var(--theme-text)" }}>{totalSections}</span>
                    </div>
                </div>
                <div className="rounded-xl p-4 flex items-center gap-4 border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                    <div className="w-12 h-12 rounded-md bg-lamaSkyLight flex items-center justify-center text-lamaSky">
                        <Users size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold block" style={{ color: "var(--theme-text-secondary)" }}>Total Capacity</span>
                        <span className="font-semibold text-lg" style={{ color: "var(--theme-text)" }}>{totalCapacity} students</span>
                    </div>
                </div>
                <div className="rounded-xl p-4 flex items-center gap-4 border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                    <div className="w-12 h-12 rounded-md bg-lamaYellowLight flex items-center justify-center text-lamaYellow">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold block" style={{ color: "var(--theme-text-secondary)" }}>Head Teacher</span>
                        <span className="font-semibold text-lg" style={{ color: "var(--theme-text)" }}>None</span>
                    </div>
                </div>
                <div className="rounded-xl p-4 flex items-center gap-4 border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                    <div className="w-12 h-12 rounded-md bg-green-50 flex items-center justify-center text-green-500">
                        <Activity size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold block" style={{ color: "var(--theme-text-secondary)" }}>Avg. Attendance</span>
                        <span className="font-semibold text-lg" style={{ color: "var(--theme-text)" }}>88.8% <small className="text-[10px] text-green-500 ml-1">↑ Average</small></span>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-8 px-2" style={{ borderBottom: "1px solid var(--theme-border)" }}>
                {["overview", "sections", "subjects", "settings"].map((t) => (
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
                        {/* LEFT CONTENT */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* ABOUT CARD */}
                            <div className="p-8 rounded-md border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                                <h2 className="text-xl font-bold mb-4" style={{ color: "var(--theme-text)" }}>About {classItem.name}</h2>
                                <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                                    {classItem.description || `Class ${classItem.name} - Standard Curriculum. This class provides a comprehensive educational framework focusing on core academic excellence and developmental milestones.`}
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-8 border-t" style={{ borderColor: "var(--theme-border)" }}>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold block mb-2" style={{ color: "var(--theme-text-secondary)", opacity: 0.5 }}>Educational Stage</span>
                                        <span className="px-3 py-1 bg-lamaSkyLight text-xs font-bold rounded-md uppercase" style={{ color: "var(--theme-primary)" }}>
                                            {classItem.stage || "Primary"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold block mb-2" style={{ color: "var(--theme-text-secondary)", opacity: 0.5 }}>Established</span>
                                        <span className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>2024</span>
                                    </div>
                                </div>
                            </div>

                            {/* RECENT ACTIVITY */}
                            <div className="p-8 rounded-md border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                                <h2 className="text-lg font-bold mb-6" style={{ color: "var(--theme-text)" }}>Recent Activity</h2>
                                <div className="flex flex-col gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-2 h-2 rounded-full bg-lamaPurple mt-2 shrink-0"></div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>New section added to {classItem.name}</h3>
                                                <p className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>2 hours ago • by Principal</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT: HEAD TEACHER */}
                        <div className="w-full lg:w-1/3">
                            <div className="p-8 rounded-xl flex flex-col gap-8 relative overflow-hidden border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-lamaSkyLight flex items-center justify-center text-lamaSky shadow-sm border border-lamaSky/10">
                                        <GraduationCap size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: "var(--theme-text)" }}>Head Teacher</h3>
                                        <p className="text-lg font-bold leading-tight" style={{ color: "var(--theme-text)" }}>Not Assigned</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 relative z-10">
                                    <p className="text-sm leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                                        A lead teacher has not been appointed for this class. 
                                        Lead teachers manage curriculum standards across all sections.
                                    </p>
                                </div>
                                
                                <div className="p-4 rounded-xl border flex items-center gap-4 relative z-10" style={{ backgroundColor: "var(--theme-surface-alt)", borderColor: "var(--theme-border)" }}>
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                        <Activity size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold" style={{ color: "var(--theme-text)" }}>Awaiting Lead</span>
                                        <span className="text-[10px]" style={{ color: "var(--theme-text-secondary)" }}>System Status: Attention Required</span>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-lamaSky hover:bg-lamaSky-hover transition-all rounded-xl text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-lamaSky/10">
                                    Assign Lead Teacher
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "sections" && (
                    <div className="p-6 rounded-md border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold" style={{ color: "var(--theme-text)" }}>Class Sections</h2>
                            {role === "admin" && (
                                <FormContainer table="section" type="create" />
                            )}
                        </div>
                        <Table columns={columns.sections} renderRow={renderSectionRow} data={classItem.sections} />
                    </div>
                )}

                {tab === "subjects" && (
                    <div className="p-6 rounded-md border" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold" style={{ color: "var(--theme-text)" }}>Curriculum Subjects</h2>
                        </div>
                        <Table columns={columns.subjects} renderRow={renderSubjectRow} data={subjects} />
                    </div>
                )}

                {tab === "settings" && (
                    <div className="flex flex-col gap-6 max-w-4xl">
                        {/* GENERAL CONFIGURATION */}
                        <div className="p-8 rounded-xl border flex flex-col gap-8" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                            <div className="flex items-center gap-4 pb-4 border-b" style={{ borderColor: "var(--theme-border)" }}>
                                <div className="w-10 h-10 rounded-lg bg-lamaSkyLight flex items-center justify-center text-lamaSky">
                                    <Sliders size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold" style={{ color: "var(--theme-text)" }}>General Configuration</h2>
                                    <p className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>Manage basic class information and metadata</p>
                                </div>
                            </div>
                            <div className="px-2">
                                <FormContainer table="class" type="update" data={classItem} />
                            </div>
                        </div>
                        
                        {/* DANGER ZONE */}
                        <div className="p-8 rounded-xl border flex flex-col gap-8" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                            <div className="flex items-center gap-4 pb-4 border-b" style={{ borderColor: "var(--theme-border)" }}>
                                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                    <Trash2 size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold" style={{ color: "var(--theme-text)" }}>Danger Zone</h2>
                                    <p className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>Critical actions that cannot be undone</p>
                                </div>
                            </div>
                            
                            <div className="p-6 rounded-lg bg-red-50/10 border border-red-500/20">
                                <h3 className="text-sm font-bold text-red-500 mb-2">Delete this Class</h3>
                                <p className="text-xs mb-6 max-w-xl" style={{ color: "var(--theme-text-secondary)" }}>
                                    Warning: Deleting this class will permanently remove all associated sections, 
                                    student assignments, and historical data. This action is irreversible and may 
                                    affect institutional reporting.
                                </p>
                                <FormContainer table="class" type="delete" id={classItem.id.toString()} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassViewPage;
