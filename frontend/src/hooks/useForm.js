import { useState } from 'react'
import { toast } from 'react-toastify'

export default function useFrom({ initialFormData = {}, validations, onSubmit = () => {} }) {
  const [formData, setData] = useState(initialFormData)
  const [isValid, setIsValid] = useState({})

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value })
    setIsValid({ ...isValid, [e.target.name]: null })
  }

  const isNotEmpty = (value) => {
    return value != null && value.trim().length > 0 ? true : false
  }

  const validate = () => {
    let validation = {}

    for (const [key, value] of Object.entries(validations)) {
      if (value.isRequired) {
        const isNotEmptyResult = isNotEmpty(formData[key])
        validation = { ...validation, [key]: isNotEmptyResult }

        if (!isNotEmptyResult) {
          toast.error(value.isRequired)
          continue
        }

        if (value.validation) {
          const validationResult = value.validation(formData[key])
          validation = { ...validation, [key]: validationResult }
          if (!validationResult) toast.error(value.validationErrorMessage)
        }
      } else {
        if (value.validation) {
          const validationResult = value.validation(formData[key])
          validation = { ...validation, [key]: validationResult }
          if (!validationResult) toast.error(value.validationErrorMessage)
        }
      }
    }

    return validation
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validation = validate()
    if (Object.values(validation).some((field) => field === false)) {
      return setIsValid(validation)
    }
    onSubmit(formData)
  }

  return { formData, isValid, handleChange, handleSubmit }
}
