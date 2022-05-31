import PropTypes from 'prop-types'

function InputRadio({ name, value, className, handleChange, checked, disabled }) {
  return (
    <input
      name={name}
      type='radio'
      value={value}
      onChange={handleChange}
      className={`${className} radio checked:bg-success`}
      checked={checked}
      disabled={disabled}
    />
  )
}

InputRadio.defaultProps = {
  disabled: false,
}

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.bool.isRequired]),
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default InputRadio
