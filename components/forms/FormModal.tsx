"use client";

import {
    deleteSection,
    deleteClass,
    deleteExam,
    deleteStudent,
    deleteSubject,
    deleteTeacher,
    deleteLesson,
    deleteAssignment,
    deleteResult,
    deleteAttendance,
    deleteEvent,
    deleteAnnouncement,
} from "@/lib/actions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
    Dispatch,
    SetStateAction,
    useActionState,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const deleteActionMap = {
    subject: deleteSubject,
    section: deleteSection,
    class: deleteClass,
    teacher: deleteTeacher,
    student: deleteStudent,
    exam: deleteExam,
    parent: deleteSubject,
    lesson: deleteLesson,
    assignment: deleteAssignment,
    result: deleteResult,
    attendance: deleteAttendance,
    event: deleteEvent,
    announcement: deleteAnnouncement,
};

const TeacherForm = dynamic(() => import("@/components/forms/TeacherForm"), {
    loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("@/components/forms/StudentForm"), {
    loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("@/components/forms/SubjectForm"), {
    loading: () => <h1>Loading...</h1>,
});
const SectionForm = dynamic(() => import("@/components/forms/SectionForm"), {
    loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("@/components/forms/ClassForm"), {
    loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("@/components/forms/ExamForm"), {
    loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("@/components/forms/LessonForm"), {
    loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(
    () => import("@/components/forms/AssignmentForm"),
    {
        loading: () => <h1>Loading...</h1>,
    },
);
const ResultForm = dynamic(() => import("@/components/forms/ResultForm"), {
    loading: () => <h1>Loading...</h1>,
});
const AttendanceForm = dynamic(
    () => import("@/components/forms/AttendanceForm"),
    {
        loading: () => <h1>Loading...</h1>,
    },
);
const EventForm = dynamic(() => import("@/components/forms/EventForm"), {
    loading: () => <h1>Loading...</h1>,
});
const AnnouncementForm = dynamic(
    () => import("@/components/forms/AnnouncementForm"),
    {
        loading: () => <h1>Loading...</h1>,
    },
);

const forms: {
    [key: string]: (
        setOpen: Dispatch<SetStateAction<boolean>>,
        type: "create" | "update",
        data?: any,
        relatedData?: any,
    ) => React.ReactNode;
} = {
    subject: (setOpen, type, data, relatedData) => (
        <SubjectForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    section: (setOpen, type, data, relatedData) => (
        <SectionForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    class: (setOpen, type, data, relatedData) => (
        <ClassForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    teacher: (setOpen, type, data, relatedData) => (
        <TeacherForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    student: (setOpen, type, data, relatedData) => (
        <StudentForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    exam: (setOpen, type, data, relatedData) => (
        <ExamForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    lesson: (setOpen, type, data, relatedData) => (
        <LessonForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    assignment: (setOpen, type, data, relatedData) => (
        <AssignmentForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    result: (setOpen, type, data, relatedData) => (
        <ResultForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    attendance: (setOpen, type, data, relatedData) => (
        <AttendanceForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    event: (setOpen, type, data, relatedData) => (
        <EventForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    announcement: (setOpen, type, data, relatedData) => (
        <AnnouncementForm
            type={type}
            data={data}
            setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
};

const actionIcons = {
    create: Plus,
    update: Pencil,
    delete: Trash2,
};

const FormModal = ({
    table,
    type,
    data,
    id,
    relatedData,
    variant,
}: FormContainerProps & {
    relatedData?: any;
    variant?: "default" | "assign";
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColorVar =
        type === "create"
            ? "var(--theme-accent)"
            : type === "update"
              ? "var(--theme-primary-light)"
              : "var(--theme-secondary)";

    const [open, setOpen] = useState(false);

    const ActionIcon = actionIcons[type] || Plus;

    const Form = () => {
        const [state, formAction, isPending] = useActionState(deleteActionMap[table], {
            success: false,
            error: false,
        });

        const router = useRouter();

        useEffect(() => {
            if (state.success) {
                toast(`${table} has been deleted!`);
                setOpen(false);
                router.refresh();
            } else if (state.error) {
                toast.error(state.message || "An error occurred during deletion!");
            }
        }, [state, router, table]);

        return type === "delete" && id ? (
            <div className="flex flex-col items-center text-center p-2">
                {/* Warning Icon Container */}
                <div className="w-12 h-12 bg-red-50 flex items-center justify-center rounded-full mb-4">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                   </svg>
                </div>
                
                <h2 className="text-lg font-bold mb-2" style={{ color: "var(--theme-text)" }}>Confirm Deletion</h2>
                <p className="text-sm mb-8 max-w-[280px]" style={{ color: "var(--theme-text-secondary)" }}>
                    Are you sure you want to delete this <span className="font-bold capitalize" style={{ color: "var(--theme-text)" }}>{table}</span>? This action cannot be undone.
                </p>

                <form action={formAction} className="flex gap-3 w-full justify-center">
                    <input type="text | number" name="id" defaultValue={id} hidden />
                    
                    <button 
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-6 py-2 font-bold text-xs rounded-md transition-colors uppercase tracking-wider"
                      style={{ border: "1px solid var(--theme-border)", color: "var(--theme-text-secondary)" }}
                    >
                      Cancel
                    </button>

                    <button 
                      disabled={isPending}
                      className="px-6 py-2 bg-red-600 text-white font-bold text-xs rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors uppercase tracking-wider flex items-center gap-2"
                    >
                        {isPending ? "Deleting..." : "Delete Permanently"}
                    </button>
                </form>
            </div>
        ) : type === "create" || type === "update" ? (
            forms[table] ? (
                forms[table](setOpen, type, data, relatedData)
            ) : (
                "Form not found!"
            )
        ) : (
            "Form not found!"
        );
    };

    return (
        <>
            {variant === "assign" ? (
                <button
                    className="px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 text-xs w-fit hover:opacity-80"
                    style={{
                        backgroundColor: "var(--theme-primary-lighter)",
                        color: "var(--theme-primary)",
                        border: "1px solid var(--theme-primary-light)",
                    }}
                    onClick={() => setOpen(true)}
                >
                    <Plus size={14} strokeWidth={2.5} /> Assign Teacher
                </button>
            ) : (
                <button
                    className={`${size} flex items-center justify-center rounded-full`}
                    style={{ backgroundColor: bgColorVar }}
                    onClick={() => setOpen(true)}
                >
                    <ActionIcon size={16} style={{ color: "var(--theme-text)" }} />
                </button>
            )}
            {open && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div
                        className={`p-8 rounded-md relative ${type === "delete" ? "w-[90%] md:w-[40%] lg:w-[30%] xl:w-[25%]" : "w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"}`}
                        style={{ backgroundColor: "var(--theme-surface)" }}
                    >
                        <Form />
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <X size={14} style={{ color: "var(--theme-text-secondary)" }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;
