import { useState } from 'react'
import PropTypes from 'prop-types'

function InputField({ name, type, placeholder, className, value, setFormData, validator, autoComplete, disabled }) {
  const [isNotEmpty, setIsNotEmpty] = useState(null)
  const [isValid, setValidity] = validator

  const handleOnChange = (e) => {
    setFormData((current) => {
      return {
        ...current,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleOnBlur = (e) => {
    return e.target.value.length > 0 ? setIsNotEmpty(true) : setIsNotEmpty(false)
  }

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`${className} focus:border-info ${isNotEmpty && isValid !== false && 'border-success'} ${
        isValid === false && 'border-error'
      }`}
      value={value}
      onFocus={() => setValidity(null)}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
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
  setFormData: PropTypes.func.isRequired,
  validator: PropTypes.array.isRequired,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
}

export default InputField
