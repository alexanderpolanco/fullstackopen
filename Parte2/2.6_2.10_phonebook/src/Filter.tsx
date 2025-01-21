import React from 'react'

export default function Filter(props) {
    const { filter, handdleChangeFilter } = props
  return (
    <div>
    filter shown with:
    <input value={filter} onChange={(e) => handdleChangeFilter(e)} />
  </div>
  )
}
