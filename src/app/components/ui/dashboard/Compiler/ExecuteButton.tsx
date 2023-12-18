import React from 'react'

type Props = {
  code: String
}

export default function ExecuteButton({ code }: Props) {
  const submitCodeHandler = () => {
    console.log('code submitted', code)

  }
  return (
    <button onClick={() => submitCodeHandler}>ExecuteButton</button>
  )
}