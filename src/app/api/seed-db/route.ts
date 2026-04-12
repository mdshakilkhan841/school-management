import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const password = "password";

  try {
    console.log("Starting Better Auth seeding via API...");

    // 1. Clear existing data
    await prisma.announcement.deleteMany();
    await prisma.event.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.result.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.student.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.class.deleteMany();
    await prisma.grade.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create Admin
    const adminRes = await auth.api.signUpEmail({
      body: {
        email: "admin1@lama.com",
        password: password,
        name: "Admin One",
      },
    });

    if (adminRes.error) {
        console.error("Admin creation failed:", adminRes.error);
        return NextResponse.json({ success: false, error: adminRes.error.message || "Admin creation failed" }, { status: 400 });
    }

    if (adminRes.user) {
      await prisma.user.update({
        where: { id: adminRes.user.id },
        data: { role: "admin" },
      });
      await prisma.admin.create({
        data: { id: adminRes.user.id, username: "admin1" },
      });
    }

    // 3. Create Teacher
    const teacherRes = await auth.api.signUpEmail({
      body: {
        email: "teacher1@lama.com",
        password: password,
        name: "Teacher One",
      },
    });

    if (teacherRes.user) {
      await prisma.user.update({
        where: { id: teacherRes.user.id },
        data: { role: "teacher" },
      });
      await prisma.teacher.create({
        data: {
          id: teacherRes.user.id,
          username: "teacher1",
          name: "TName1",
          surname: "TSurname1",
          email: "teacher1@example.com",
          phone: "123456",
          address: "Address",
          bloodType: "A+",
          sex: "MALE",
          birthday: new Date(1990, 0, 1),
        },
      });
    }

    // 4. Create Student
    const studentRes = await auth.api.signUpEmail({
        body: {
          email: "student1@lama.com",
          password: password,
          name: "Student One",
        },
    });
  
    if (studentRes.user) {
        await prisma.user.update({
          where: { id: studentRes.user.id },
          data: { role: "student" },
        });

        const parent = await prisma.parent.create({
            data: {
                id: `parent_of_${studentRes.user.id}`,
                username: `parent1`,
                name: "Parent",
                surname: "Surname",
                email: `parent1@example.com`,
                phone: "123",
                address: "Address"
            }
        });

        const grade = await prisma.grade.create({ data: { level: 1 } });
        const classItem = await prisma.class.create({ 
            data: { name: "1A", gradeId: grade.id, capacity: 20 } 
        });

        await prisma.student.create({
            data: {
                id: studentRes.user.id,
                username: `student1`,
                name: "Student",
                surname: "Surname",
                email: "student1@lama.com",
                phone: "123",
                address: "Address",
                bloodType: "O-",
                sex: "MALE",
                parentId: parent.id,
                gradeId: grade.id,
                classId: classItem.id,
                birthday: new Date(2015, 0, 1),
            }
        });
    }

    return NextResponse.json({ success: true, message: "Database seeded correctly via Better Auth API." });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
