import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB(); // Make sure this is awaited if it's an async function
        const { email, password } = await req.json();

    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
