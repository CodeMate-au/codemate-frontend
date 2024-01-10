import { NextRequest } from "next/server";
import { getSubmission } from "../actions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  console.log(
    "this is the token in get_submission/route.ts",
    searchParams.get("token")
  );

  if (!token) {
    return new Response(JSON.stringify({ error: "No token provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await getSubmission(token);
  const data = await response.json();

  // console.log("data response", data);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
