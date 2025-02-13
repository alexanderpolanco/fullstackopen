import React from 'react'

export default function Form(props) {
    const { newName, newNumber, handleChangeName, handleChangeNumber, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
    <div>
      Name: <input value={newName} required placeholder='John Doe' onChange={(e) => handleChangeName(e)} />
    </div>
    <div>
      Number:
      <input
        type="tel"
        value={newNumber}
        required
        placeholder='56-9-65987456'
        onChange={(e) => handleChangeNumber(e)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
