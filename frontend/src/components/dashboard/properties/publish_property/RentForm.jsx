import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormStepsControls from './FormStepsControls'
import PublishAvailabilityDetails from './PublishAvailabilityDetails'
import PublishContractDetails from './PublishContractDetails'
import PublishEquipmentDetails from './PublishEquipmentDetails'
import PublishFinanceDetails from './PublishFinanceDetails'
import PublishOptionalInfo from './PublishOptionalInfo'
import RentFormConfirmation from './RentFormConfirmation'
import useForm from 'hooks/useForm'
import { addRental } from 'context/rents/rentsSlice'

function RentForm({ property, steps }) {
  const dispatch = useDispatch()

  const { formData, isValid, handleChangeCustom, handleSubmit } = useForm({
    initialFormData: {
      available_from: new Date().setHours(0, 0, 0, 0),
      furnished: true,
      rental_type: 'short',
      price: 0,
      deposit: 0,
      property,
    },
    validations: {
      available_from: {
        isRequired: 'Please select a date when the property will be available',
      },
      price: {
        isRequired: 'Please provide the monthly rent amount for the property',
        validation: (price) => (price > 0 ? true : false),
        validationErrorMessage: 'Monthly rent amount must be greater than £0',
      },
      deposit: {
        isRequired: 'Please provide the deposit amount for the property',
        validation: (deposit) => (deposit > 0 ? true : false),
        validationErrorMessage: 'Deposit amount must be greater than £0',
      },
    },
    onSubmit: (data) => {
      if (data?.tenancy_info?.blocks?.length === 0) {
        delete data.tenancy_info
      }
      dispatch(addRental(data))
    },
  })

  const [step, setStep] = useState(1)

  const handleNext = useCallback(
    (e) => {
      e.preventDefault()
      setStep((prev) => (prev < steps.length ? prev + 1 : prev))
    },
    [steps.length]
  )

  const handlePrev = useCallback((e) => {
    e.preventDefault()
    setStep((prev) => (prev > 1 ? prev - 1 : prev))
  }, [])

  const formSteps = () => {
    switch (step) {
      case 1:
        return <PublishEquipmentDetails onChange={handleChangeCustom} formData={formData} />
      case 2:
        return <PublishFinanceDetails onChange={handleChangeCustom} formData={formData} forRent={true} />
      case 3:
        return <PublishContractDetails onChange={handleChangeCustom} formData={formData} />
      case 4:
        return <PublishAvailabilityDetails onChange={handleChangeCustom} formData={formData} />
      case 5:
        return <PublishOptionalInfo onChange={handleChangeCustom} formData={formData} />
      case 6:
        return <RentFormConfirmation formData={formData} validity={isValid} />
      default:
        return <></>
    }
  }

  return (
    <form className='flex flex-col justify-center items-center gap-10 w-full mx-auto' onSubmit={handleSubmit} noValidate>
      {formSteps()}
      <FormStepsControls steps={steps} currentStep={step} handleNext={handleNext} handlePrev={handlePrev} />
    </form>
  )
}

export default RentForm
