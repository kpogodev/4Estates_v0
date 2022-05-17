import PropTypes from 'prop-types'
import {nanoid} from '@reduxjs/toolkit'
function InputSelect({ className, name, value, options, handleChange, disabled, readOnly, placeholderOption }) {
  const formattedOption = (option) => {
    if (typeof option === 'string') {
      return option.includes('-')
        ? option
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('-')
        : option
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    } else {
      return option
    }
  }

  return (
    <select name={name} className={`select select-bordered ${className}`} onChange={handleChange} value={value} disabled={disabled}>
      {placeholderOption && <option value={isNaN(value) ? 'default' : 0}>{placeholderOption}</option>}
      {options.map((option) => (
        <option key={nanoid()} value={option.toString().toLowerCase()}>
          {formattedOption(option)}
        </option>
      ))}
    </select>
  )
}

InputSelect.defaultProps = {
  disabled: false,
  className: '',
}

InputSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholderOption: PropTypes.string,
  disabled: PropTypes.bool,
}

export default InputSelect
