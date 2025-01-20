import React from 'react'

const Total = ({totales}) => {

  const valorInicial = 0;
  const sumWithInitial = totales.reduce(
    (acumulador, elemento) => acumulador + elemento.exercises,
    valorInicial,
  );
  return (
    <div><b>{`total of ${sumWithInitial} exercises`}</b></div>
  )
}

export default Total