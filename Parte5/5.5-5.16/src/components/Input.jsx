const Input = ({ value, onChange, type, label }) => (
  <label>
    {label}
    <input
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </label>
)

export default Input