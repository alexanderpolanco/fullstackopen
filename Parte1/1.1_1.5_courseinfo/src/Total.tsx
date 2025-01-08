import React from 'react'

const Total = ({totales}) => {

  const total = totales[0].exercises + totales[1].exercises + totales[2].exercises
  
  return (
    <div>{total}</div>
  )
}

export default Total