import PropTypes from 'prop-types'
function InputSelect({ name, value, options, handleChange, disabled }) {
  return (
    <select name={name} className='select select-bordered' onChange={handleChange} value={value} disabled={disabled}>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase()}>
          {`${option.trim().charAt(0).toUpperCase()}${option.slice(1)}`}
        </option>
      ))}
    </select>
  )
}

InputSelect.defaultProps = {
  disabled: false,
}

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default InputSelect
