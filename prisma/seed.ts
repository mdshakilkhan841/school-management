import { Day, PrismaClient, UserSex } from "@prisma/client";
import { auth } from "../src/lib/auth";

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
  await auth.api.signUpEmail({
    body: {
      email: "admin1@lama.com",
      password: "password", // This MUST be plain text here, Better Auth will hash it
      name: "Admin One",
    },
  });
  
  const adminUser = await prisma.user.findFirst({ where: { email: "admin1@lama.com" } });
  if (adminUser) {
    await prisma.user.update({
        where: { id: adminUser.id },
        data: { role: "admin" }
    });
    await prisma.admin.create({
        data: { id: adminUser.id, username: "admin1" }
    });
  }

  // ADD TEACHER
  await auth.api.signUpEmail({
    body: {
      email: "teacher1@lama.com",
      password: "password",
      name: "Teacher One",
    },
  });
  
  const teacherUser = await prisma.user.findFirst({ where: { email: "teacher1@lama.com" } });
  if (teacherUser) {
    await prisma.user.update({
        where: { id: teacherUser.id },
        data: { role: "teacher" }
    });
    await prisma.teacher.create({
        data: {
          id: teacherUser.id,
          username: "teacher1",
          name: "TName1",
          surname: "TSurname1",
          email: "teacher1@example.com",
          phone: "123456",
          address: "Address",
          bloodType: "A+",
          sex: "MALE",
          birthday: new Date(1990, 0, 1),
        }
    });
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
