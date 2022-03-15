import { useState } from 'react'
import { toast } from 'react-toastify'

export const useAuthFormsValidator = () => {
  const [emailValid, setEmailValid] = useState(null)
  const [passwordValid, setPasswordValid] = useState(null)
  const [nameValid, setNameValid] = useState(null)
  const [rePasswordValid, setRePasswordValid] = useState(null)

  // Name Validation
  const validateName = (name) => {
    const isValid = name.length > 0 && name.length <= 100 ? true : false
    setNameValid(isValid)

    if (!isValid) toast.error('User name must consist of between 1 to 100 characters')
    return isValid
  }

  // Email Validation
  const validateEmail = (email) => {
    const isValid = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? true
      : false
    setEmailValid(isValid)

    if (!isValid) toast.error('Please provide valid email address')
    return isValid
  }

  // Password Validation
  const validatePassword = (password) => {
    const isValid = password.length > 0 ? true : false
    setPasswordValid(isValid)

    if (!isValid) toast.error('Password field cannot be empty')
    return isValid
  }

  // Validate Repeat Password
  const validateRepeatPassword = (password, rePassword) => {
    const isValid = password === rePassword ? true : false
    setRePasswordValid(isValid)

    if (!isValid) toast.error('Passwords must match')
    return isValid
  }

  const setValidityAll = (state) => {
    setNameValid(state)
    setEmailValid(state)
    setPasswordValid(state)
    setRePasswordValid(state)
  }

  return {
    nameValid,
    emailValid,
    passwordValid,
    rePasswordValid,
    validateName,
    validateEmail,
    validatePassword,
    validateRepeatPassword,
    setValidityAll,
  }
}
