import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "section"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  const role = session?.user?.role as string;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "section":
        const sectionClasses = await prisma.class.findMany({
          select: { id: true, level: true },
        });
        const sectionTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: sectionTeachers, classes: sectionClasses };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentClasses = await prisma.class.findMany({
          select: { id: true, level: true },
        });
        const studentSections = await prisma.section.findMany({
          include: { _count: { select: { students: true } } },
        });
        const studentParents = await prisma.parent.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {
          sections: studentSections,
          classes: studentClasses,
          parents: studentParents,
        };
        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
      case "lesson":
        const lessonSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        const lessonSections = await prisma.section.findMany({
          select: { id: true, name: true },
        });
        const lessonTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {
          subjects: lessonSubjects,
          sections: lessonSections,
          teachers: lessonTeachers,
        };
        break;
      case "assignment":
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: assignmentLessons };
        break;
      case "result":
        const resultExams = await prisma.exam.findMany({
          where: {
            ...(role === "teacher" ? { lesson: { teacherId: currentUserId! } } : {}),
          },
          select: { id: true, title: true },
        });
        const resultAssignments = await prisma.assignment.findMany({
          where: {
            ...(role === "teacher" ? { lesson: { teacherId: currentUserId! } } : {}),
          },
          select: { id: true, title: true },
        });
        const resultStudents = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {
          exams: resultExams,
          assignments: resultAssignments,
          students: resultStudents,
        };
        break;
      case "attendance":
        const attendanceStudents = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        });
        const attendanceLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = {
          students: attendanceStudents,
          lessons: attendanceLessons,
        };
        break;
      case "event":
        const eventSections = await prisma.section.findMany({
          select: { id: true, name: true },
        });
        relatedData = { sections: eventSections };
        break;
      case "announcement":
        const announcementSections = await prisma.section.findMany({
          select: { id: true, name: true },
        });
        relatedData = { sections: announcementSections };
        break;
      case "class":
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
