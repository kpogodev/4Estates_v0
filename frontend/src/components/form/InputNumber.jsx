import { useState } from 'react'
import PropTypes from 'prop-types'

function InputNumber({ name, className, minValue, maxValue, value, setFormData, validator, disabled }) {
  const [isNotEmpty, setIsNotEmpty] = useState(null)
  const [isValid, setValidity] = validator

  const handleOnChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: +e.target.value }))

  const handleOnBlur = (e) => {
    return e.target.value > 0 ? setIsNotEmpty(true) : setIsNotEmpty(false)
  }

  return (
    <input
      name={name}
      className={`${className} focus:border-info ${isNotEmpty && isValid !== false && 'border-success'} ${
        isValid === false && 'border-error'
      }`}
      type='number'
      min={minValue}
      max={maxValue}
      value={value}
      onInput={handleOnChange}
      onBlur={handleOnBlur}
      onFocus={() => setValidity(null)}
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
  setFormData: PropTypes.func.isRequired,
  validator: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
}

export default InputNumber
