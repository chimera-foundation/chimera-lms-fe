import { API_URL } from "@/app/settings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const authorization = request.headers.get("Authorization");

  let params = {
    ...(start_date && { start_date }),
    ...(end_date && { end_date }),
  };

  const query = new URLSearchParams(params).toString();

  let url = `${API_URL}/events?${query}`;
  console.log("GET: All Events", url);

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
