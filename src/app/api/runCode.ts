import type { Submission } from '@src/app/lib/definitions';
const JUDGE0_RAPID_API_URL = process.env.JUDGE0_RAPID_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

export const JUDGE0_HEADERS = {
  'content-type': 'application/json',
  'Content-Type': 'application/json',
  'x-rapidapi-key': JUDGE0_API_KEY!,
  'x-rapidapi-host': JUDGE0_RAPID_API_URL!,
};

export const judge_options = {
  headers: JUDGE0_HEADERS,
  params: { base64_encoded: 'true' },
};

const createSubmission = (payload: Submission) =>
  fetch(`https://${JUDGE0_RAPID_API_URL}/submissions`, {
    ...judge_options,
    method: 'POST',
    body: JSON.stringify(payload),
  });

const getSubmission = (token: string) => {
  return fetch(`${JUDGE0_RAPID_API_URL}/submissions/${token}`, {
    ...judge_options,
  });
};
