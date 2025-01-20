import React from "react";
import Course from "./Course";

const App = () => {
  const course = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 4,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 5,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;

/**
 *
 *
 */

/**
 *     <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
 */
