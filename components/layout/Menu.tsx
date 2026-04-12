import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import MenuLink from "./MenuLink";

const menuItems = [
  {
    title: "OVERVIEW",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Finance",
        href: "/finance",
        visible: ["admin"],
      },
      {
        icon: "/calendar.png",
        label: "Calendar",
        href: "/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Grievances",
        href: "/grievances",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "ORGANIZATION",
    items: [
      {
        icon: "/setting.png",
        label: "Website Manager",
        href: "/website",
        visible: ["admin"],
      },
      {
        icon: "/profile.png",
        label: "School Admins",
        href: "/admins",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Departments",
        href: "/departments",
        visible: ["admin"],
      },
      {
        icon: "/home.png",
        label: "Houses",
        href: "/houses",
        visible: ["admin"],
      },
      {
        icon: "/setting.png",
        label: "Facilities",
        href: "/facilities",
        visible: ["admin"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/parents",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "ACADEMIC",
    items: [
      {
        icon: "/class.png",
        label: "Classes",
        href: "/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/subjects",
        visible: ["admin"],
      },
      {
        icon: "/calendar.png",
        label: "Timetable",
        href: "/timetable",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/lesson.png",
        label: "Lesson Planner",
        href: "/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/assignment.png",
        label: "Board Circulars",
        href: "/circulars",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/result.png",
        label: "Diary",
        href: "/diary",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Substitutions",
        href: "/substitutions",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/announcement.png",
        label: "Notices",
        href: "/notices",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Leave",
        href: "/leave",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        icon: "/setting.png",
        label: "Logs",
        href: "/logs",
        visible: ["admin"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role as string;
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <MenuLink key={item.label} item={item} />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
