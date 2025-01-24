import React from 'react'

export default function Persons({ persons, handleDelete }) {
  return (
    persons.map((person) => (
      <div key={person.name}>
        {`${person.name} ${person.number} `}
        <button onClick={()=>handleDelete(person.id)}>Delete</button>
      </div>
    ))
  )
}
