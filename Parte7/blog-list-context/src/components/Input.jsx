const Input = ({ value, onChange, type, label, ...rest }) => (
  <label className="input">
    <div className="text-label">{label}</div>
    <input
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      {...rest}
    />
  </label>
);

export default Input;
