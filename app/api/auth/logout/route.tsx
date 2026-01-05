import { API_URL } from "@/app/settings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authorization = request.headers.get("Authorization");

  let url = `${API_URL}/auth/logout`;
  console.log("POST: User Logout", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${authorization}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
