import connectDB from "@/database/dbConfig";
import { NextResponse } from "next/server";

await connectDB(); // Make sure this is awaited if it's an async function
export async function POST(req) {
    try {
        const body = await req.json();
        console.log("🚀 ~ POST ~ body:", body);
        return NextResponse.json({ ok: true, data: body }, { status: 200 });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
