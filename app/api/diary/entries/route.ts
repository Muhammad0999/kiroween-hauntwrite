import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { entryRepository } from "@/src/lib/db";

// GET - Fetch user's diary entries
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "The spirits sense no soul..." },
      { status: 401 }
    );
  }

  try {
    const entries = await entryRepository.findByUserId(session.user.id);
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "The spirits are restless..." },
      { status: 500 }
    );
  }
}

// POST - Create new diary entry
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "The spirits sense no soul..." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { content, hauntedContent, intensity } = body;

    if (!content || !hauntedContent) {
      return NextResponse.json(
        { error: "The spirits demand both mortal and haunted words..." },
        { status: 400 }
      );
    }

    const entry = await entryRepository.create(
      session.user.id,
      content,
      hauntedContent,
      intensity || 5
    );

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "The spirits are restless..." },
      { status: 500 }
    );
  }
}
