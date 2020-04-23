import React from 'react'

export const Equal = (props) => {
  const clickFunc = () => {
    props.setResult(props.result + props.input)
    props.setInput(0)
  }

  return (
    <button onClick={clickFunc}>=</button>
  )
}
