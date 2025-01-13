import React from 'react'

export default function StatisticLine (props) {
   const {descripcion, valor} = props
  return (
    <div>{`${descripcion} ${valor}`}</div>
  )
}