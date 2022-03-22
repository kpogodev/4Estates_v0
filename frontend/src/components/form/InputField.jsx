import PropTypes from 'prop-types'
function InputField({ name, type, placeholder, className, value, handleChange, isValid, autoComplete, disabled }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`${className} focus:border-info ${isValid === false ? 'border-error' : ''} ${
        isValid === true ? 'border-success' : ''
      }`}
      value={value}
      onChange={handleChange}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  )
}

InputField.defualtProps = {
  value: '',
  disabled: false,
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default InputField
