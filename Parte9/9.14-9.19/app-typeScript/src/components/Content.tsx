import Part from "./Part";
import { type CoursePart } from "../types/CoursePart.ts";

interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content(props: ContentProps) {
  const { courseParts } = props
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}
