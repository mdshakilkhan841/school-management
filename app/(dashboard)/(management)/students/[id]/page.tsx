import Announcements from "@/components/dashboard/Announcements";
import BigCalendarContainer from "@/components/calendar/BigCalendarContainer";
import FormContainer from "@/components/forms/FormContainer";
import Performance from "@/components/dashboard/Performance";
import StudentAttendanceCard from "@/components/shared/StudentAttendanceCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { Droplets, Calendar, Mail, Phone, CheckCircle, GitBranch, Lightbulb, School } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getStudentById } from "@/services/studentService";

const SingleStudentPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role as string;

  const student = await getStudentById(id);

  if (!student) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Contact information and academic details for {student.name}.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Droplets size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Calendar size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(student.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Mail size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Phone size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <CheckCircle size={24} style={{ color: "var(--theme-primary)" }} />
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
            </div>
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <GitBranch size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">{student.class.name.charAt(0)}th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <Lightbulb size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">{student.class._count.lessons}</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <School size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-md p-4 h-[800px]" style={{ backgroundColor: "var(--theme-surface)" }}>
          <h1>Student&apos;s Schedule</h1>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md" style={{ backgroundColor: "var(--theme-surface)" }}>
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/lessons?classId=${student.class.id}`}>Student&apos;s Lessons</Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href={`/teachers?classId=${student.class.id}`}>Student&apos;s Teachers</Link>
            <Link className="p-3 rounded-md bg-pink-50" href={`/exams?classId=${student.class.id}`}>Student&apos;s Exams</Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/assignments?classId=${student.class.id}`}>Student&apos;s Assignments</Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href={`/results?studentId=${student.id}`}>Student&apos;s Results</Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
