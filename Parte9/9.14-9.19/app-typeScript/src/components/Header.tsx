interface Props {
    courseName: string
}


export default function Header(props: Props) {
    const { courseName } = props
    return (
        <h1>{courseName}</h1>
    )
}
