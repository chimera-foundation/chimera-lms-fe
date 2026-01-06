import { API_URL } from "@/app/settings";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authorization = request.headers.get("Authorization");
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  let url = `${API_URL}/dashboard/schedule?date=${date}`;
  console.log("GET: Dashboard Daily Schedule", url);

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
