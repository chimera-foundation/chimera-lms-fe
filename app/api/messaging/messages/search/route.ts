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
  const query = searchParams.get("query");

  const params = {
    ...(query && { query }),
  };

  const qs = new URLSearchParams(params).toString();
  const url = `${API_URL}/messaging/messages/search?${qs}`;
  console.log("GET: Search Messages", url);

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
