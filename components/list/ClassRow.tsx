"use client";

import { Class, Section, Teacher } from "@/app/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
                className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight cursor-pointer transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                        <span className="font-bold text-gray-800">
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
                            <span className="text-gray-300 italic text-xs font-normal">
                                No sections
                            </span>
                        )}
                    </div>
                </td>
                <td className="hidden md:table-cell font-medium text-gray-600 uppercase text-[10px]">
                    {item.bellSchedule || "Not Assigned"}
                </td>
                <td className="hidden md:table-cell font-bold text-gray-700">
                    {item._count.students}
                </td>
                <td className="hidden md:table-cell font-bold text-gray-700">
                    {item.capacity || "-"}
                </td>
                <td className="hidden lg:table-cell text-gray-500 uppercase text-[10px] font-bold">
                    {item.stage || "-"}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                        <Link href={`/classes/${item.id}`}>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                <Image
                                    src="/view.png"
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                            </button>
                        </Link>
                        {classActions}
                    </div>
                </td>
            </tr>
            {isOpen && (
                <tr className="bg-gray-50/10">
                    <td colSpan={7} className="p-0">
                        <div className="bg-white mx-24 border-x border-b border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b border-gray-100 bg-gray-50/50">
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
                                <tbody className="divide-y divide-gray-100">
                                    {item.sections.map((section, index) => (
                                        <tr
                                            key={section.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="pl-10 pr-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-7 h-7 rounded-none ${getSectionColor(section.name)} flex items-center justify-center font-bold text-white text-[10px]`}
                                                    >
                                                        {section.name}
                                                    </div>
                                                    <span className="text-gray-700 text-sm">
                                                        Section {section.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <div className="flex items-center justify-center">
                                                    {section.supervisor ? (
                                                        <span className="text-gray-600 text-sm">
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
                                                <span className="text-gray-700 font-medium text-sm">
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
                                                        href={`/list/sections/${section.id}`}
                                                    >
                                                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                                            <Image
                                                                src="/view.png"
                                                                alt=""
                                                                width={14}
                                                                height={14}
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
                                                className="p-12 text-center text-gray-400 italic text-sm"
                                            >
                                                No sections found for this
                                                class.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Custom dashed line at the bottom of the container if it doesn't span full height */}
                            <div className="px-10">
                                <div
                                    className="w-full h-[1px]"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to right, #f3f4f6 50%, transparent 50%)",
                                        backgroundSize: "12px 1px",
                                        backgroundRepeat: "repeat-x",
                                    }}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ClassRow;
