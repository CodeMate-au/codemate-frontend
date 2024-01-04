import { NextRequest } from "next/server";
// import { useSearchParams } from 'next/navigation';
const JUDGE0_RAPID_API_URL = process.env.JUDGE0_RAPID_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_RAPID_API_KEY;

const JUDGE0_HEADERS = {
  "X-RapidAPI-Host": JUDGE0_RAPID_API_URL!,
  "X-RapidAPI-Key": JUDGE0_API_KEY!,
};
const judge_options = {
  headers: JUDGE0_HEADERS,
  params: { base64_encoded: "false" },
};

export async function getSubmission(token: string) {
  const url = `https://${JUDGE0_RAPID_API_URL}/submissions/${token}`;

  // console.log('url', `${url}`);

  try {
    const response = await fetch(`${url}`, {
      ...judge_options,
      method: "GET",
    });

    // console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error in getSubmission:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  console.log(
    "this is the token in get_submission/route.ts",
    searchParams.get("token")
  );

  if (!token) {
    return Response.json({ error: "No token provided" });
  }

  const response = await getSubmission(token);
  const data = await response.json();

  // console.log("data response", data);
  return Response.json(data);
}
