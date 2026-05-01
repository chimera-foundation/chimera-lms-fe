import { API_URL } from "@/app/settings";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token")?.value;
  const moduleId = (await params).moduleId;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = `${API_URL}/student/modules/${moduleId}/complete`;

  console.log("POST: Complete Module", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
