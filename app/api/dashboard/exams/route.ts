import { API_URL } from "@/app/settings";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authorization = request.headers.get("Authorization");

  let url = `${API_URL}/dashboard/exams`;
  console.log("GET: Dashboard Exams", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${authorization}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
