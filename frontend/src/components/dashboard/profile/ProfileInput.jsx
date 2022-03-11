import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function ProfileInput({ label, type, currentValue, editable, setFormData, name }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(currentValue)
  }, [currentValue])

  useEffect(() => {
    setFormData((currentData) => {
      return {
        ...currentData,
        [name]: currentValue,
      }
    })
  }, [currentValue, name, setFormData])

  const handleChange = (e) => {
    setValue(e.target.value)
    setFormData((currentData) => {
      return {
        ...currentData,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <div className='form-control w-full mt-3 relative'>
      <label>
        <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>{label}</span>
        <input
          name={name}
          type={type}
          className={`input input-bordered w-full ${
            editable ? 'border-info focus:outline-info' : 'focus:outline-none'
          }`}
          value={value}
          onChange={handleChange}
          readOnly={!editable}
          tabIndex={editable ? 0 : -1}
        />
      </label>
    </div>
  )
}

ProfileInput.defaultProps = {
  editable: false,
  currentValue: '',
}

ProfileInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  editable: PropTypes.bool,
}

export default ProfileInput
