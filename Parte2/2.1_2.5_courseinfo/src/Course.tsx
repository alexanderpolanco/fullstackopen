import React from 'react'
import Header from './Header';
import Content from './Content';
import Total from './Total';

 const Course = ({course}) => {
  const {parts, name} = course;
  
  return (
    <>
    <Header name={name} />
    <Content parts={parts} />
    <Total totales={parts} />
    </>
  )
}

export default Course;