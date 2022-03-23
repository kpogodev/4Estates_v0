import PropTypes from 'prop-types'
function InputNumber({ name, className, minValue, maxValue, value, handleChange, isValid, disabled }) {
  return (
    <input
      name={name}
      className={`${className} focus:border-info ${isValid === false ? 'border-error' : ''} ${
        isValid === true ? 'border-success' : ''
      }`}
      type='number'
      min={minValue}
      max={maxValue}
      value={value}
      onInput={handleChange}
      disabled={disabled}
    />
  )
}

InputNumber.defaultProps = {
  value: 1,
  disabled: false,
}

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default InputNumber
