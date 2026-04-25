import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();


    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

  
    if (
      email === "premkumar00786337@gmail.com" &&
      password === "1234"
    ) {
     
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return NextResponse.json({ token });
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  } catch (error) {
    console.error("AUTH ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}