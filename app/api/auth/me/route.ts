import { API_URL } from "@/app/settings";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const url = `${API_URL}/auth/me`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Fetch failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
