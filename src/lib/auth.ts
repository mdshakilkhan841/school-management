import { betterAuth } from "better-auth";
import prisma from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "sqlite", "mysql" depending on your setup
    }),
    emailAndPassword: {
      enabled: true,
    },
    user: {
        additionalFields: {
           role: {
              type: "string",
              required: false
           }
        }
    },
    plugins: [nextCookies(), admin()],
});
