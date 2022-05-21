import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetError, resetSuccess } from 'redux/rents/rentsSlice'
import FormStepsControls from './FormStepsControls'
import PublishAvailabilityDetails from './PublishAvailabilityDetails'
import PublishContractDetails from './PublishContractDetails'
import PublishEquipmentDetails from './PublishEquipmentDetails'
import PublishFinanceDetails from './PublishFinanceDetails'
import PublishOptionalInfo from './PublishOptionalInfo'
import RentFormConfirmation from './RentFormConfirmation'
import useForm from 'hooks/useForm'
import { addRental, selectRentsIsError, selectRentsMessage, selectRentsIsSuccess } from 'redux/rents/rentsSlice'
import MultiStepFormIndicator from 'components/form/MultiStepFormIndicator'

function RentForm({ propertyId, steps }) {
  const [formFilled, setFormFilled] = useState(false)
  const [step, setStep] = useState(1)

  const isSuccess = useSelector(selectRentsIsSuccess)
  const isError = useSelector(selectRentsIsError)
  const message = useSelector(selectRentsMessage)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { formData, isValid, handleChangeCustom, handleSubmit } = useForm({
    initialFormData: {
      available_from: new Date().setHours(0, 0, 0, 0),
      furnished: true,
      rental_type: 'short',
      price: 0,
      deposit: 0,
      property: propertyId,
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
        validation: (deposit) => (deposit >= 0 ? true : false),
        validationErrorMessage: 'Deposit amount cannot be a negative number',
      },
    },
    onSubmit: (data) => {
      if (data?.tenancy_info?.blocks?.length === 0) {
        delete data.tenancy_info
      }
      dispatch(addRental(data))
    },
  })

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

  const goToStep = useCallback((step) => {
    setStep(step)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetSuccess())
      navigate(`/manage-property/${propertyId}`)
    }

    if (isError) {
      toast.error(message)
      dispatch(resetError())
    }
  }, [isSuccess, isError, message, propertyId, navigate, dispatch])

  useEffect(() => {
    if (step === steps.length) {
      setFormFilled(true)
    }
  }, [step, steps.length])

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
        return (
          <PublishOptionalInfo
            onChange={handleChangeCustom}
            initialData={formData?.tenancy_info}
            stateName='tenancy_info'
            title='Tenancy Information (Optional)'
          />
        )
      case 6:
        return <RentFormConfirmation formData={formData} isValid={isValid} goToStep={goToStep} />
      default:
        return <></>
    }
  }

  return (
    <form className='flex flex-col justify-center items-center gap-10 w-full mx-auto' onSubmit={handleSubmit} noValidate>
      <MultiStepFormIndicator step={step} titles={steps} containerClassNames='w-full max-w-xl' clickable={formFilled} onClick={goToStep} />
      {formSteps()}
      <FormStepsControls steps={steps} currentStep={step} handleNext={handleNext} handlePrev={handlePrev} />
    </form>
  )
}

export default RentForm
