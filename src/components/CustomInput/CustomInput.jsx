const CustomInput = ({ label, value, onChange }) => {
  return (
    <div className="input__group">
      <label className="input__label">{label}</label>
      <input
        className="input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
