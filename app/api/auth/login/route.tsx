import { API_URL } from "@/app/settings";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    let body = { email, password };
    let url = `${API_URL}/auth/login`;

    console.log("POST: User Login", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Login failed" },
        { status: response.status }
      );
    }

    (await cookies()).set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1800,
      path: "/",
    });

    (await cookies()).set(
      "access_token_expiry",
      `${Date.now() + 1800 * 1000}`,
      {
        httpOnly: false,
        path: "/",
      }
    );

    return NextResponse.json(
      {
        username: data.username,
        token_type: data.token_type,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
