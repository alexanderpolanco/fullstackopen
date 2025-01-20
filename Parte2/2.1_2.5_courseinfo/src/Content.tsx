import React from "react";
import Part from "./Part";

const Content = ({parts}) =>  {

    return (
      <div>
        {parts.map(part => <Part key={part.id} parte={part.name} />)}
      </div>
    )
  }

  export default Content;