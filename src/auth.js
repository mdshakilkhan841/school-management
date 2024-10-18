import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectDB from "./lib/mongoose";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(
        connectDB().then((mongoose) => mongoose.connection.getClient())
    ),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userId: { label: "User Id", type: "text" }, // Correct type for userId
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const { userId, password } = credentials;
                console.log("🚀 ~ authorize: ~ userId:", userId);

                try {
                    const user = await User.findOne({ userId, password }); // Find the user by userId
                    console.log("🚀 ~ authorize: ~ user:", user);

                    if (!user) {
                        throw new Error("No user found.");
                    }

                    // const isPasswordValid = bcrypt.compare(
                    //     password,
                    //     user.password
                    // );
                    // if (!isPasswordValid) {
                    //     throw new Error("Invalid password.");
                    // }

                    // Return the user object excluding the password field
                    return {
                        id: user._id,
                        userId: user.userId,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null; // Return null to indicate an error occurred
                }
            },
        }),
    ],
    // pages: {
    //     signIn: "/api/signin", // Redirect to the sign-in page in case of errors
    // },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.userId = token.userId;
            session.user.role = token.role;

            return session;
        },
    },
    session: {
        strategy: "jwt", // Using JWT for session management
    },
    secret: process.env.AUTH_SECRET, // Ensure this is set in your environment variables
});
