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
  const itemize = searchParams.get("itemize");
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");

  let params = {
    ...(itemize && { itemize: itemize }),
    ...(page && { page: page }),
    ...(per_page && { per_page: per_page }),
  };

  const query = new URLSearchParams(params).toString();

  let url = `${API_URL}/schedules?${query}`;
  console.log("GET: Schedules", url);

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
