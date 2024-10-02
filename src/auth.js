import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                let user = null;

                // logic to salt and hash password
                const pwHash = bcrypt.hash(credentials.password, 10);

                // logic to verify if the user exists
                user = await getUserFromDb(credentials.email, pwHash);

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.");
                }

                // return user object with their profile data
                return user;
            },
        }),
    ],
});
