import PropTypes from 'prop-types'
import { useState } from 'react'

function InputTextarea({ name, placeholder, value, className, handleChange, maxlength, isValid, disabled }) {
  const [count, setCount] = useState(0)

  const handleOnChange = (e) => {
    handleChange(e)
    setCount(e.target.value.length)
  }

  return (
    <>
      <textarea
        className={`${className} focus:border-info ${isValid === false ? 'border-error' : ''} ${
          isValid === true ? 'border-success' : ''
        }`}
        disabled={disabled}
        name={name}
        maxLength={maxlength}
        onChange={handleOnChange}
        placeholder={placeholder}
        value={value}
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  maxlength: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
}

export default InputTextarea
