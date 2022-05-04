import { useState } from 'react'
import { toast } from 'react-toastify'

export default function useForm({ initialFormData = {}, validations, onSubmit = () => {} }) {
  const [formData, setFormData] = useState(initialFormData)
  const [isValid, setIsValid] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setIsValid({ ...isValid, [e.target.name]: null })
  }

  const handleChangeCustom = (name, value) => {
    setFormData({ ...formData, [name]: value })
    setIsValid({ ...isValid, [name]: null })
  }

  const isNotEmpty = (value) => {
    if (typeof value === 'number') return true
    return value != null && value.trim().length > 0 ? true : false
  }

  const isMatching = (valueA, valueB) => (valueA === valueB ? true : false)

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
          if (!validationResult) {
            toast.error(value.validationErrorMessage)
            continue
          }
        }

        if (value.isSame) {
          const matchResult = isMatching(formData[value.isSame.values[0]], formData[value.isSame.values[1]])
          validation = { ...validation, [key]: matchResult }

          if (!matchResult) {
            toast.error(value.isSame.compareErrorMessage)
            continue
          }
        }
      } else {
        if (value.validation && formData[key].toString().length > 0) {
          const validationResult = value.validation(formData[key])
          validation = { ...validation, [key]: validationResult }
          if (!validationResult) toast.error(value.validationErrorMessage)
        }

        if (value.isSame) {
          const matchResult = isMatching(formData[value.isSame.values[0]], formData[value.isSame.values[1]])
          validation = { ...validation, [key]: matchResult }

          if (!matchResult) {
            toast.error(value.isSame.compareErrorMessage)
            continue
          }
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

  const handleReset = () => {
    setFormData(initialFormData)
    setIsValid({})
  }

  return { formData, isValid, handleChange, handleSubmit, handleChangeCustom, handleReset }
}
