import { NextRequest, NextResponse } from 'next/server';
import type { Submission } from '@src/app/lib/definitions';
const JUDGE0_RAPID_API_URL = process.env.JUDGE0_RAPID_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_RAPID_API_KEY;

const JUDGE0_HEADERS = {
  'content-type': 'application/json',
  'Content-Type': 'application/json',
  'x-rapidAPI-key': JUDGE0_API_KEY!,
  'x-rapidAPI-host': JUDGE0_RAPID_API_URL!,
};

const judge_options = {
  headers: JUDGE0_HEADERS,
  params: { base64_encoded: 'false' },
};

const createSubmission = async (payload: Submission) =>
  await fetch(`https://${JUDGE0_RAPID_API_URL}/submissions/?}`, {
    ...judge_options,
    method: 'POST',
    body: JSON.stringify(payload),
  });

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Submission;
  // console.log('this is payload', payload);
  // console.log('option', judge_options);
  // console.log('url', `http://${JUDGE0_RAPID_API_URL}/submissions`);
  const res = await createSubmission(payload);
  const data = await res.json();
  return NextResponse.json(data);
}
