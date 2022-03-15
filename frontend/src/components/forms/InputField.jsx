import { useState } from 'react'
import PropTypes from 'prop-types'

function InputField({ name, type, placeholder, className, value, setFormData, validator, autoComplete }) {
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
    return e.target.value.length > 0 && setIsNotEmpty(true)
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
    />
  )
}

InputField.defualtProps = {
  value: '',
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  setFormData: PropTypes.func.isRequired,
  validator: PropTypes.array.isRequired,
  autoComplete: PropTypes.string,
}

export default InputField
