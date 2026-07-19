import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    const resolvedParams = await params;
    await Gallery.findByIdAndDelete(resolvedParams.id);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
