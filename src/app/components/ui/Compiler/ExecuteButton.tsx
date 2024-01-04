import { useRef } from "react"


type Props = {
  source_code: string
  language_id: number,
  stdin: string
}

export default async function ExecuteButton({ source_code, language_id, stdin }: Props) {


  const submitCodeHandler = async () => {
    // console.log('code submitted', source_code)
    const payload = { source_code, language_id, stdin };
    const response = await fetch(`/api/run_code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    // console.log('submission response', data);
  }

  return (
    <button onClick={submitCodeHandler}>ExecuteButton</button>
  )
}