import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetError, resetSuccess, addSale } from 'context/sales/salesSlice'
import FormStepsControls from './FormStepsControls'
import useForm from 'hooks/useForm'
import PublishFinanceDetails from './PublishFinanceDetails'
import SaleFormConfirmation from './SaleFormConfirmation'
import PublishOptionalInfo from './PublishOptionalInfo'
import MultiStepFormIndicator from 'components/form/MultiStepFormIndicator'

function SaleForm({ propertyId, steps }) {
  const [formFilled, setFormFilled] = useState(false)
  const [step, setStep] = useState(1)

  const { isSuccess, isError, message } = useSelector((state) => state.sales)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { formData, isValid, handleChangeCustom, handleSubmit } = useForm({
    initialFormData: {
      price: 0,
      property: propertyId,
    },
    validations: {
      price: {
        isRequired: 'Please provide price of the property',
        validation: (price) => (price > 0 ? true : false),
        validationErrorMessage: 'Property price must be greater than £0',
      },
    },
    onSubmit: (data) => {
      if (data?.additional_info?.blocks?.length === 0) {
        delete data.additional_info
      }
      dispatch(addSale(data))
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
      navigate(`/manage-property/${propertyId}`)
      dispatch(resetSuccess())
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
        return <PublishFinanceDetails onChange={handleChangeCustom} formData={formData} />
      case 2:
        return (
          <PublishOptionalInfo
            onChange={handleChangeCustom}
            initialData={formData?.additional_info}
            stateName='additional_info'
            title='Additional Information (Optional)'
          />
        )
      case 3:
        return <SaleFormConfirmation formData={formData} isValid={isValid} goToStep={goToStep} />
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

export default SaleForm
