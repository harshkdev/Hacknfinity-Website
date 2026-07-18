import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Sponsor from "@/models/Sponsor";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    await dbConnect();
    const sponsors = await Sponsor.find({}).sort({ createdAt: -1 });
    return NextResponse.json(sponsors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const sponsor = await Sponsor.create(body);
    return NextResponse.json(sponsor, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
