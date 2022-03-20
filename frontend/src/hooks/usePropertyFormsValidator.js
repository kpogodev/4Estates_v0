import { useState } from 'react'
import { toast } from 'react-toastify'

export const usePropertyFormsValidator = () => {
  const [addressValid, setAddressValid] = useState(null)
  const [descriptionValid, setDescriptionValid] = useState(null)
  const [keyFeaturesValid, setKeyFeaturesValid] = useState(null)
  const [bedroomsValid, setBedroomsValid] = useState(null)
  const [bathroomsValid, setBathroomsValid] = useState(null)
  const [sizeValid, setSizeValid] = useState(null)

  // Validate Address
  const validateAddress = (address) => {
    const isValid = address.length > 0 ? true : false
    setAddressValid(isValid)

    if (!isValid) toast.error('Please provide address')
    return isValid
  }

  // Validate Description
  const validateDescription = (desc) => {
    const isValid = desc.length > 0 && desc.length <= 3200 ? true : false
    setDescriptionValid(isValid)

    if (!isValid) toast.error('Description cannot be empty and is limited to 3200 characters')
    return isValid
  }

  // Validate Key Features
  const validateKeyFeatures = (keyFeatures) => {
    const isValid = keyFeatures.length <= 1000 ? true : false
    setKeyFeaturesValid(isValid)

    if (!isValid) toast.error('Key features are limited to 1000 characters')
    return isValid
  }

  // Validate Bedrooms
  const validateBedrooms = (bedrooms) => {
    const isValid = bedrooms >= 1 && bedrooms <= 100 ? true : false
    setBedroomsValid(isValid)

    if (!isValid) toast.error('Property can have between 1 and 100 bedrooms')
    return isValid
  }

  // Validate Bathrooms
  const validateBathrooms = (bathrooms) => {
    const isValid = bathrooms >= 1 && bathrooms <= 100 ? true : false
    setBathroomsValid(isValid)

    if (!isValid) toast.error('Property can have between 1 and 100 bathrooms')
    return isValid
  }

  // Validate Size
  const validateSize = (size) => {
    const isValid = size > 0 && size <= 99999999 ? true : false
    setSizeValid(isValid)

    if (!isValid) toast.error('Size of the property can be only up to 99999999 square meters.')
    return isValid
  }

  const setValidityAll = (state) => {
    setAddressValid(state)
  }

  return {
    addressValid,
    descriptionValid,
    keyFeaturesValid,
    bedroomsValid,
    bathroomsValid,
    sizeValid,
    validateAddress,
    validateDescription,
    validateKeyFeatures,
    validateBedrooms,
    validateBathrooms,
    validateSize,
    setValidityAll,
  }
}
