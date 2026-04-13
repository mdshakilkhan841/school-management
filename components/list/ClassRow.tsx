"use client";

import { Class, Section, Teacher } from "@/app/generated/prisma";
import Link from "next/link";
import { useState } from "react";
import { Eye, ChevronRight } from "lucide-react";

type AcademicClassList = Class & {
    sections: (Section & { supervisor: Teacher | null })[];
    _count: { students: number };
};

interface ClassRowProps {
    item: AcademicClassList;
    role: string;
    classActions: React.ReactNode;
    sectionActions: React.ReactNode[];
    sectionAssignButtons: React.ReactNode[];
}

const ClassRow = ({
    item,
    role,
    classActions,
    sectionActions,
    sectionAssignButtons,
}: ClassRowProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Consistency with current theme colors for sections
    const getSectionColor = (name: string) => {
        const bgColors = [
            "bg-indigo-600",
            "bg-pink-600",
            "bg-amber-500",
            "bg-cyan-600",
            "bg-emerald-600",
            "bg-rose-600",
            "bg-fuchsia-600",
            "bg-violet-600",
            "bg-orange-600",
            "bg-sky-600",
        ];
        const nameValue = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
        return bgColors[nameValue % bgColors.length];
    };

    return (
        <>
            <tr
                className="text-sm cursor-pointer transition-all"
                style={{ borderBottom: "1px solid var(--theme-border)" }}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "var(--theme-primary-lighter)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                }
            >
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                        >
                            <ChevronRight
                                size={12}
                                style={{ color: "var(--theme-text-secondary)" }}
                            />
                        </div>
                        <span
                            className="font-bold"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {item.name || `Level ${item.level}`}
                        </span>
                    </div>
                </td>
                <td className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                        {item.sections.map((section) => {
                            const bgColor = getSectionColor(section.name);
                            return (
                                <span
                                    key={section.id}
                                    className={`px-2 py-0.5 ${bgColor} ${bgColor === "bg-amber-500" ? "text-gray-800" : "text-white"} rounded-sm text-[10px] font-bold`}
                                >
                                    {section.name}
                                </span>
                            );
                        })}
                        {item.sections.length === 0 && (
                            <span
                                className="italic text-xs font-normal"
                                style={{ color: "var(--theme-text-secondary)" }}
                            >
                                No sections
                            </span>
                        )}
                    </div>
                </td>
                <td
                    className="hidden md:table-cell font-medium uppercase text-[10px]"
                    style={{ color: "var(--theme-text-secondary)" }}
                >
                    {item.bellSchedule || "Not Assigned"}
                </td>
                <td
                    className="hidden md:table-cell font-bold"
                    style={{ color: "var(--theme-text)" }}
                >
                    {item._count.students}
                </td>
                <td
                    className="hidden md:table-cell font-bold"
                    style={{ color: "var(--theme-text)" }}
                >
                    {item.capacity || "-"}
                </td>
                <td
                    className="hidden lg:table-cell uppercase text-[10px] font-bold"
                    style={{ color: "var(--theme-text-secondary)" }}
                >
                    {item.stage || "-"}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                        <Link href={`/classes/${item.id}`}>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                <Eye
                                    size={16}
                                    style={{ color: "var(--theme-text)" }}
                                />
                            </button>
                        </Link>
                        {classActions}
                    </div>
                </td>
            </tr>
            {isOpen && (
                <tr>
                    <td colSpan={7} className="p-0 pb-4">
                        <div
                            className="overflow-hidden rounded-none shadow-sm"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderTop: "1px solid var(--theme-border)",
                                borderBottom: "1px solid var(--theme-border)",
                                borderLeft: "4px solid var(--theme-primary)",
                            }}
                        >
                            <table className="w-full text-xs">
                                <thead>
                                    <tr
                                        className="text-left"
                                        style={{
                                            borderBottom:
                                                "1px solid var(--theme-border)",
                                            color: "var(--theme-text-secondary)",
                                        }}
                                    >
                                        <th className="pl-10 pr-6 py-4 font-bold uppercase tracking-wider">
                                            Section Details
                                        </th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-center">
                                            Class Teacher
                                        </th>
                                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-center">
                                            Capacity
                                        </th>
                                        <th className="pl-6 pr-10 py-4 font-bold uppercase tracking-wider text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.sections.map((section, index) => (
                                        <tr
                                            key={section.id}
                                            className="transition-colors"
                                            style={{
                                                borderBottom: "1px solid var(--theme-border)",
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    "var(--theme-primary-lighter)")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    "transparent")
                                            }
                                        >
                                            <td className="pl-10 pr-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-7 h-7 rounded-none ${getSectionColor(section.name)} flex items-center justify-center font-bold text-white text-[10px]`}
                                                    >
                                                        {section.name}
                                                    </div>
                                                    <span
                                                        className="text-sm"
                                                        style={{
                                                            color: "var(--theme-text)",
                                                        }}
                                                    >
                                                        Section {section.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <div className="flex items-center justify-center">
                                                    {section.supervisor ? (
                                                        <span
                                                            className="text-sm"
                                                            style={{
                                                                color: "var(--theme-text-secondary)",
                                                            }}
                                                        >
                                                            {
                                                                section
                                                                    .supervisor
                                                                    .name
                                                            }{" "}
                                                            {
                                                                section
                                                                    .supervisor
                                                                    .surname
                                                            }
                                                        </span>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            {
                                                                sectionAssignButtons[
                                                                    index
                                                                ]
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <span
                                                    className="font-medium text-sm"
                                                    style={{
                                                        color: "var(--theme-text)",
                                                    }}
                                                >
                                                    {section.capacity || "-"}
                                                </span>
                                            </td>
                                            <td className="pl-6 pr-10 py-3">
                                                <div
                                                    className="flex items-center justify-end gap-2"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <Link
                                                        href={`/sections/${section.id}`}
                                                    >
                                                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                                            <Eye
                                                                size={14}
                                                                style={{
                                                                    color: "var(--theme-text)",
                                                                }}
                                                            />
                                                        </button>
                                                    </Link>
                                                    {sectionActions[index]}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {item.sections.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="p-12 text-center italic text-sm"
                                                style={{
                                                    color: "var(--theme-text-secondary)",
                                                }}
                                            >
                                                No sections found for this
                                                class.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ClassRow;
