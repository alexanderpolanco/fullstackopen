import React from 'react'

export default function Form(props) {
    const { newName, newNumber, handdleChangeName, handdleChangeNumber, handdleSubmit } = props
  return (
    <form onSubmit={handdleSubmit}>
    <div>
      Name: <input value={newName} onChange={(e) => handdleChangeName(e)} />
    </div>
    <div>
      Number:
      <input
        type="tel"
        value={newNumber}
        onChange={(e) => handdleChangeNumber(e)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
