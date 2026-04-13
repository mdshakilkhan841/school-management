import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import { Droplets, Calendar, Mail, Phone, CheckCircle, GitBranch, Lightbulb, School } from "lucide-react";
import { notFound } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return notFound();

  const id = session.user.id;
  const role = session.user.role as string;

  let userData: any = null;

  if (role === "admin") {
    userData = await prisma.admin.findUnique({ where: { id } });
  } else if (role === "teacher") {
    userData = await prisma.teacher.findUnique({
      where: { id },
      include: {
        _count: { select: { subjects: true, lessons: true, classes: true } },
      },
    });
  } else if (role === "student") {
    userData = await prisma.student.findUnique({
      where: { id },
      include: {
        class: { include: { _count: { select: { lessons: true } } } },
      },
    });
  } else if (role === "parent") {
    userData = await prisma.parent.findUnique({
      where: { id },
      include: { students: true },
    });
  }

  if (!userData) return notFound();

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={userData.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">
                {userData.name ? `${userData.name} ${userData.surname}` : userData.username}
              </h1>
              <p className="text-sm text-gray-500">
                {role.charAt(0).toUpperCase() + role.slice(1)} Profile
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Droplets size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{userData.bloodType || "N/A"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Calendar size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{userData.birthday ? new Intl.DateTimeFormat("en-US").format(userData.birthday) : "N/A"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Mail size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{userData.email || "N/A"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Phone size={14} style={{ color: "var(--theme-text-secondary)" }} />
                  <span>{userData.phone || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <CheckCircle size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <GitBranch size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">
                  {role === "teacher"
                    ? userData._count.subjects
                    : role === "student"
                    ? userData.class.name
                    : "-"}
                </h1>
                <span className="text-sm text-gray-400">
                  {role === "teacher" ? "Subjects" : role === "student" ? "Class" : "Branch"}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <Lightbulb size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">
                  {role === "teacher"
                    ? userData._count.lessons
                    : role === "student"
                    ? userData.class._count.lessons
                    : "-"}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]" style={{ backgroundColor: "var(--theme-surface)" }}>
              <School size={24} style={{ color: "var(--theme-primary)" }} />
              <div>
                <h1 className="text-xl font-semibold">
                  {role === "teacher" ? userData._count.classes : "-"}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 rounded-md p-4 h-[800px]" style={{ backgroundColor: "var(--theme-surface)" }}>
          <h1 className="text-xl font-semibold">User Activity & Info</h1>
          <div className="mt-4 p-4 border rounded-md">
            <h2 className="font-medium">Bio / Address</h2>
            <p className="text-sm text-gray-600 mt-2">
              {userData.address || "No address provided."}
            </p>
          </div>
          {role === "parent" && (
            <div className="mt-4">
              <h2 className="font-medium mb-2">My Children</h2>
              <div className="flex gap-2 flex-wrap">
                {userData.students.map((student: any) => (
                  <div key={student.id} className="p-2 bg-lamaSkyLight rounded-md text-sm">
                    {student.name} {student.surname}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md" style={{ backgroundColor: "var(--theme-surface)" }}>
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <span className="p-3 rounded-md bg-lamaSkyLight">User's Lessons</span>
            <span className="p-3 rounded-md bg-lamaPurpleLight">User's Teachers</span>
            <span className="p-3 rounded-md bg-lamaYellowLight">User's Results</span>
            <span className="p-3 rounded-md bg-lamaSkyLight">User's Exams</span>
            <span className="p-3 rounded-md bg-lamaPurpleLight">User's Assignments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
