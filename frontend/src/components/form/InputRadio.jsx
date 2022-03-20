import PropTypes from 'prop-types'

function InputRadio({ name, value, className, setFormData, checked, disabled }) {
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
      disabled={disabled}
    />
  )
}

InputRadio.defaultProps = {
  disabled: false,
}

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  setFormData: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default InputRadio
