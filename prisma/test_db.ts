import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
    console.log("Testing connection...");
    try {
        const admins = await prisma.admin.findMany();
        console.log("Admins found:", admins.length);
        const classes = await prisma.class.findMany();
        console.log("Classes found:", classes.length);
        const sections = await prisma.section.findMany();
        console.log("Sections found:", sections.length);
        const students = await prisma.student.findMany();
        console.log("Students found:", students.length);
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

main().catch(console.error).finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
});
