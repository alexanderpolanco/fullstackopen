import React from "react";
import Part from "./Part";

const Content = ({parts}) =>  {

    return (
      <div>
        <Part parte={parts[0].name} />
        <Part parte={parts[1].name} />
        <Part parte={parts[2].name} />
      </div>
    )
  }

  export default Content;