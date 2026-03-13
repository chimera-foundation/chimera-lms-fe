import { API_URL } from "@/app/settings";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const searchParams = request.nextUrl.searchParams;
  const filter = searchParams.get("filter");

  let params = {
    ...(filter && { filter }),
  };

  const query = new URLSearchParams(params).toString();

  let url = `${API_URL}/grades/trend?${query}`;

  console.log("GET: Grade Trend", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
