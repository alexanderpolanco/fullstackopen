import { type CoursePart } from "../types/CoursePart.ts"

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default function Part({ part }: { part: CoursePart }) {
    switch (part.kind) {
        case "basic":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i>
                </p>
            );
        case "group":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    project exercises {part.groupProjectCount}
                </p>
            );
        case "background":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/>
                    submit to {part.backgroundMaterial}
                </p>
            );
        case "special":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/>
                    requirements: {part.requirements.join(", ")}
                </p>
            );
        default:
            return assertNever(part);
    }
}
