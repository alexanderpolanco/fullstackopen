interface TotalProps {
  totalExercises: number;
}

export default function Total({ totalExercises }: TotalProps) {
    return (
        <p>Number of exercises {totalExercises}</p>
    )
}
