import PropTypes from 'prop-types'
function InputNumber({ name, className, minValue, maxValue, value, handleChange, isValid, disabled, readOnly }) {
  return (
    <input
      name={name}
      className={`${className} focus:border-info ${isValid === false ? 'border-error' : ''} ${isValid === true ? 'border-success' : ''}`}
      type='number'
      min={minValue}
      max={maxValue}
      value={value}
      onInput={handleChange}
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}

InputNumber.defaultProps = {
  disabled: false,
  readOnly: false,
}

InputNumber.propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default InputNumber
