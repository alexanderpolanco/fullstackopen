const Input = ({ value, onChange, type, label, ...rest }) => (
  <label>
    {label}
    <input
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      {...rest}
    />
  </label>
);

export default Input;
