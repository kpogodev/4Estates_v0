import { useState } from 'react'
import { toast } from 'react-toastify'

export const useAuthFormsValidator = () => {
  const [emailValid, setEmailValid] = useState(null)

  const validateEmail = (email) => {
    const isValid = email
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ? true
      : false

    setEmailValid(isValid)
    if (!isValid) toast.error('Please provide valid email address')
    return isValid
  }

  const setValidityAll = (state) => {
    setEmailValid(state)
  }

  return {
    emailValid,
    validateEmail,
    setValidityAll,
  }
}
