export default function Filter(props) {
    const { filter, handleChangeFilter } = props
  return (
    <div>
    find contries:
    <input value={filter} onChange={(e) => handleChangeFilter(e)} />
  </div>
  )
}
