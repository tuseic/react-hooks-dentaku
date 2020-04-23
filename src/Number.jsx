import React from 'react'

export const Number = (props) => {
  const clickFunc = () => {
    props.setInput(props.input * 10 + props.number)
  }

  return (
    <button onClick={clickFunc}>{props.number}</button>
  )
}
