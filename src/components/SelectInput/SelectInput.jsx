const SelectInput = ({ label, options, value, onChange }) => (
  <div className="input__group">
    <label className="input__label">{label}</label>
    <select
      className="input"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
