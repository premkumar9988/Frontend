import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "No token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      message: "Protected data",
      user: decoded,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}