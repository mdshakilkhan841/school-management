import { auth } from "./src/lib/auth.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    console.log("Starting Better Auth seeding...");
    const password = "password";

    // Admin
    const adminEmail = "admin1@lama.com";
    await auth.api.signUpEmail({
        body: {
            email: adminEmail,
            password: password,
            name: "Admin One",
        }
    });
    
    const adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (adminUser) {
        await prisma.user.update({
            where: { id: adminUser.id },
            data: { role: "admin" }
        });
        await prisma.admin.create({
            data: { id: adminUser.id, username: "admin1" }
        });
    }

    console.log("Admin seeded.");
    process.exit(0);
}

seed().catch(e => {
    console.error(e);
    process.exit(1);
});
