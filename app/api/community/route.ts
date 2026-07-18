import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ForumThread from "@/models/ForumThread";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const threads = await ForumThread.find({}).sort({ createdAt: -1 });
    return NextResponse.json(threads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const thread = await ForumThread.create(body);
    return NextResponse.json(thread, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
