import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/src/lib/auth";
import { entryRepository } from "@/src/lib/db";

// PUT - Update a diary entry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "The spirits sense no soul..." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const entry = await entryRepository.findById(id);

    if (!entry) {
      return NextResponse.json(
        { error: "This entry has vanished into the void..." },
        { status: 404 }
      );
    }

    if (entry.userId !== session.user.id) {
      return NextResponse.json(
        { error: "This soul does not belong to you..." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { content, hauntedContent, intensity } = body;

    // Update the entry
    const updated = await entryRepository.update(id, content, hauntedContent, intensity);
    
    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update this entry..." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, entry: updated });
  } catch (error) {
    console.error("Error updating entry:", error);
    return NextResponse.json(
      { error: "The spirits are restless..." },
      { status: 500 }
    );
  }
}

// DELETE - Delete a diary entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "The spirits sense no soul..." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const entry = await entryRepository.findById(id);

    if (!entry) {
      return NextResponse.json(
        { error: "This entry has vanished into the void..." },
        { status: 404 }
      );
    }

    if (entry.userId !== session.user.id) {
      return NextResponse.json(
        { error: "This soul does not belong to you..." },
        { status: 403 }
      );
    }

    // Delete the entry
    const deleted = await entryRepository.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: "Failed to banish this entry..." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json(
      { error: "The spirits are restless..." },
      { status: 500 }
    );
  }
}
