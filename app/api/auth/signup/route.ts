import { NextRequest, NextResponse } from "next/server";
import { userRepository } from "@/src/lib/db";
import { hashPassword, validateEmail, validatePassword } from "@/src/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "The spirits sense an invalid email address...",
        },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: passwordValidation.error,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This soul is already bound to our realm...",
        },
        { status: 409 }
      );
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const user = await userRepository.create(email, passwordHash);

    return NextResponse.json(
      {
        success: true,
        message: "Your soul has been bound to the darkness...",
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "The spirits are restless... Please try again.",
      },
      { status: 500 }
    );
  }
}
