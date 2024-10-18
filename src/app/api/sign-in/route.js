import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";

export async function POST(req) {
    try {
        await connectDB(); // Await the connection to the database
        const { userId, password } = await req.json(); // Extract the JSON body from the POST request

        console.log("🚀 ~ POST ~ password:", password);
        console.log("🚀 ~ POST ~ userId:", userId);

        const user = await User.findOne({ userId, password });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // const isPasswordMatch = await bcrypt.compare(password, user.password);
        // if (!isPasswordMatch) {
        //     return NextResponse.json(
        //         { error: "Invalid credentials" },
        //         { status: 404 }
        //     );
        // }

        return NextResponse.json(
            {
                message: "Login successful",
                user: { ...user._doc, password: undefined },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
