import "dotenv/config";
import { UserSex, Day } from "../app/generated/prisma/client";
import prisma from "../lib/prisma";
import { auth } from "../lib/auth";

async function main() {
  console.log("Starting seeding with Better Auth...");

  // 1. SEED ADMIN via Better Auth
  const adminEmail = "admin@school.com";
  const password = "password123";

  // Check if admin already exists in User table
  let adminUser = await prisma.user.findFirst({ where: { email: adminEmail } });

  if (!adminUser) {
    console.log("Creating Admin via Better Auth...");
    const response = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: password,
        name: "Main Admin",
      },
    });
    
    adminUser = await prisma.user.findFirst({ where: { email: adminEmail } });
  }

  if (adminUser) {
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { role: "admin" },
    });

    await prisma.admin.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        id: adminUser.id,
        username: "admin",
      },
    });
    console.log("Admin seeded.");
  }

  // 2. SEED CLASSES (formerly Grades)
  console.log("Seeding classes...");
  for (let i = 1; i <= 6; i++) {
    await prisma.class.upsert({
      where: { level: i },
      update: {},
      create: { level: i, name: `Grade ${i}` },
    });
  }

  // 3. SEED SUBJECTS
  console.log("Seeding subjects...");
  const subjects = [
    "Mathematics", "English", "Physics", "Chemistry", 
    "Biology", "History", "Geography", "Art"
  ];
  for (const name of subjects) {
    await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 4. SEED SECTIONS (formerly Classes)
  console.log("Seeding sections...");
  for (let i = 1; i <= 6; i++) {
    await prisma.section.upsert({
      where: { name_classId: { name: `${i}A`, classId: i } },
      update: {},
      create: {
        name: `${i}A`,
        capacity: 20,
        classId: i,
      },
    });
  }
  console.log("Sections seeded.");

  // 5. SEED TEACHERS
  console.log("Seeding teachers...");
  for (let i = 1; i <= 5; i++) {
    const teacherId = `teacher${i}`;
    const teacherEmail = `teacher${i}@school.com`;
    
    let u = await prisma.user.findFirst({ where: { email: teacherEmail } });
    if (!u) {
        await auth.api.signUpEmail({
            body: { email: teacherEmail, password: "password123", name: `Teacher ${i}` }
        });
        u = await prisma.user.findFirst({ where: { email: teacherEmail } });
    }
    
    if (u) {
        await prisma.user.update({ where: { id: u.id }, data: { role: "teacher" } });
        await prisma.teacher.upsert({
            where: { username: teacherId },
            update: {},
            create: {
                id: u.id,
                username: teacherId,
                name: `Teacher`,
                surname: `${i}`,
                email: teacherEmail,
                phone: `12345678${i}`,
                address: `Teacher St ${i}`,
                bloodType: "A+",
                sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
                birthday: new Date(1980 + i, 0, 1),
                subjects: { connect: [{ id: (i % 8) + 1 }] },
            }
        });
    }
  }

  // 6. SEED PARENTS & STUDENTS
  console.log("Seeding parents and students...");
  for (let i = 1; i <= 5; i++) {
    const parentEmail = `parent${i}@example.com`;
    let pu = await prisma.user.findFirst({ where: { email: parentEmail } });
    if (!pu) {
        await auth.api.signUpEmail({ body: { email: parentEmail, password: "password123", name: `Parent ${i}` } });
        pu = await prisma.user.findFirst({ where: { email: parentEmail } });
    }

    if (pu) {
        await prisma.user.update({ where: { id: pu.id }, data: { role: "parent" } });
        await prisma.parent.upsert({
            where: { username: `parent${i}` },
            update: {},
            create: {
                id: pu.id,
                username: `parent${i}`,
                name: `Parent`,
                surname: `${i}`,
                email: parentEmail,
                phone: `99900000${i}`,
                address: `Parent Rd ${i}`,
            }
        });

        const studentEmail = `student${i}@school.com`;
        let su = await prisma.user.findFirst({ where: { email: studentEmail } });
        if (!su) {
            await auth.api.signUpEmail({ body: { email: studentEmail, password: "password123", name: `Student ${i}` } });
            su = await prisma.user.findFirst({ where: { email: studentEmail } });
        }

        if (su) {
            await prisma.user.update({ where: { id: su.id }, data: { role: "student" } });
            await prisma.student.upsert({
                where: { username: `student${i}` },
                update: {},
                create: {
                    id: su.id,
                    username: `student${i}`,
                    name: `Student`,
                    surname: `${i}`,
                    email: studentEmail,
                    phone: `55544400${i}`,
                    address: `Student Blvd ${i}`,
                    bloodType: "O-",
                    sex: i % 2 === 0 ? UserSex.FEMALE : UserSex.MALE,
                    parentId: pu.id,
                    classId: (i % 6) + 1,
                    sectionId: (i % 6) + 1,
                    birthday: new Date(2015, 0, 1),
                }
            });
        }
    }
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
