import React from 'react'

export default function Filter(props) {
    const { filter, handleChangeFilter } = props
  return (
    <div>
    filter shown with:
    <input value={filter} onChange={(e) => handleChangeFilter(e)} />
  </div>
  )
}
