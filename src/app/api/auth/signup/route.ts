import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, confirmPassword } = await req.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  if (confirmPassword !== password) {
    return NextResponse.json(
      {
        message: "Password do not match",
      },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      { status: 400 }
    );
  }
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
