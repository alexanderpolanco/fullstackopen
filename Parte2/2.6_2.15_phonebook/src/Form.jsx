import React from 'react'

export default function Form(props) {
    const { newName, newNumber, handleChangeName, handleChangeNumber, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
    <div>
      Name: <input value={newName} required onChange={(e) => handleChangeName(e)} />
    </div>
    <div>
      Number:
      <input
        type="tel"
        value={newNumber}
        required
        onChange={(e) => handleChangeNumber(e)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
