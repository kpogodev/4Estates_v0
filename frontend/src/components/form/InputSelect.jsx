import { useEffect } from 'react'
import PropTypes from 'prop-types'

function InputSelect({ name, value, options, setFormData, disabled }) {
  useEffect(() => {
    setFormData((prev) => ({ ...prev, [name]: options[0] }))
  }, [])

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <select name={name} className='select select-bordered' onChange={handleOnChange} value={value} disabled={disabled}>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase()}>
          {`${option.trim().charAt(0).toUpperCase()}${option.slice(1)}`}
        </option>
      ))}
    </select>
  )
}

InputSelect.defaultProps = {
  value: '',
  disabled: false,
}

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setFormData: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default InputSelect
