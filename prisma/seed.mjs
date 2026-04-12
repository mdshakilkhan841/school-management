import { Day, PrismaClient, UserSex } from "@prisma/client";
import { auth } from "../src/lib/auth.js";

const prisma = new PrismaClient();

async function main() {
  const password = "password";

  console.log("Dropping existing data...");
  // Clear tables in order
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

  console.log("Seeding new data using Better Auth API...");

  // ADMIN
  for (let i = 1; i <= 1; i++) {
    const email = `admin${i}@lama.com`;
    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: `Admin ${i}`,
      },
    });

    if (res.user) {
      await prisma.user.update({
        where: { id: res.user.id },
        data: { role: "admin" },
      });
      await prisma.admin.create({
        data: { id: res.user.id, username: `admin${i}` },
      });
    }
  }

  // GRADE & CLASS (Standard Setup)
  for (let i = 1; i <= 6; i++) {
    const grade = await prisma.grade.create({ data: { level: i } });
    await prisma.class.create({ 
      data: { name: `${i}A`, gradeId: grade.id, capacity: 20 } 
    });
  }

  // SUBJECT
  const subjects = ["Math", "Science", "English", "History", "Physics"].map(name => ({ name }));
  for (const s of subjects) await prisma.subject.create({ data: s });

  // TEACHER
  for (let i = 1; i <= 3; i++) {
    const email = `teacher${i}@lama.com`;
    const res = await auth.api.signUpEmail({
      body: { email, password, name: `Teacher ${i}` },
    });

    if (res.user) {
      await prisma.user.update({
        where: { id: res.user.id },
        data: { role: "teacher" },
      });
      await prisma.teacher.create({
        data: {
          id: res.user.id,
          username: `teacher${i}`,
          name: `TName${i}`,
          surname: `TSurname${i}`,
          email: `teacher${i}@example.com`,
          phone: `123456${i}`,
          address: "Address",
          bloodType: "A+",
          sex: "MALE",
          birthday: new Date(1990, 0, 1),
        },
      });
    }
  }

  // STUDENT
  for (let i = 1; i <= 5; i++) {
    const email = `student${i}@lama.com`;
    const res = await auth.api.signUpEmail({
      body: { email, password, name: `Student ${i}` },
    });

    if (res.user) {
        await prisma.user.update({
          where: { id: res.user.id },
          data: { role: "student" },
        });
        
        const parent = await prisma.parent.create({
            data: {
                id: `parent_of_${res.user.id}`,
                username: `parent${i}`,
                name: "Parent",
                surname: "Surname",
                email: `parent${i}@example.com`,
                phone: "123",
                address: "Address"
            }
        });

        await prisma.student.create({
            data: {
                id: res.user.id,
                username: `student${i}`,
                name: "Student",
                surname: "Surname",
                email: email,
                phone: "123",
                address: "Address",
                bloodType: "O-",
                sex: "MALE",
                parentId: parent.id,
                gradeId: 1,
                classId: 1,
                birthday: new Date(2015, 0, 1),
            }
        });
    }
  }

  console.log("Seeding finished successfully.");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
