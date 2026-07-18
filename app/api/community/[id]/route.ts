import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ForumThread from "@/models/ForumThread";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const params = await context.params;
    await dbConnect();
    await ForumThread.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const params = await context.params;
    await dbConnect();
    const body = await req.json();
    const thread = await ForumThread.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(thread);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
