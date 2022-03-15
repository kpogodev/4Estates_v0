function InputRadio({ name, value, className, setFormData, checked }) {
  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <input
      name={name}
      type='radio'
      value={value}
      onChange={handleChange}
      className={`radio checked:bg-success ${className}`}
      checked={checked}
    />
  )
}

export default InputRadio
