import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Sponsor from "@/models/Sponsor";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    await Sponsor.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
