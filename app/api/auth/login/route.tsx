import { API_URL } from "@/app/settings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
  return NextResponse.json(data, { status: response.status });
}
