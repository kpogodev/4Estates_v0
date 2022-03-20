import PropTypes from 'prop-types'
import { useState } from 'react'

function InputTextarea({ name, placeholder, value, className, setFormData, maxlength, validator, disabled }) {
  const [count, setCount] = useState(0)
  const [isNotEmpty, setIsNotEmpty] = useState(null)
  const [isValid, setValidity] = validator

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setCount(e.target.value.length)
  }

  const handleOnBlur = (e) => {
    return e.target.value.length > 0 ? setIsNotEmpty(true) : setIsNotEmpty(false)
  }

  return (
    <>
      <textarea
        className={`${className} focus:border-info ${isNotEmpty && isValid !== false && 'border-success'} ${
          isValid === false && 'border-error'
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        onFocus={() => setValidity(null)}
        onBlur={handleOnBlur}
        maxLength={maxlength}
        disabled={disabled}
      ></textarea>
      <label className='label'>
        <span className='label-alt text-sm italic ml-auto'>
          {count}/{maxlength}
        </span>
      </label>
    </>
  )
}

InputTextarea.defaultProps = {
  disabled: false,
  value: '',
}

InputTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setFormData: PropTypes.func.isRequired,
  maxlength: PropTypes.number.isRequired,
  validator: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
}

export default InputTextarea
