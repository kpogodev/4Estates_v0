import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PublishPropertyType from './PublishPropertyType'
import PublishSaleDetails from './PublishSaleDetails'
import PublishRentDetails from './PublishRentDetails'
import { AnimatePresence, motion } from 'framer-motion'
import MultiStepFormIndicator from '../../../../form/MultiStepFormIndicator'

function PublishPropertyForm() {
  const [formData, setFormData] = useState({
    available_from: new Date(),
    furnished: false,
    rental_type: 'long',
  })
  const [offerType, setOfferType] = useState('rent')
  const [step, setStep] = useState(1)

  const params = useParams()

  useEffect(() => {
    setFormData((prev) => ({ ...prev, property: params.id }))
  }, [params.id])

  const handleNext = useCallback((e) => {
    e.preventDefault()
    setStep((prev) => (prev < 4 ? prev + 1 : prev))
  }, [])

  const handlePrev = useCallback((e) => {
    e.preventDefault()
    setStep((prev) => (prev > 1 ? prev - 1 : prev))
  }, [])

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleTypeChange = useCallback((e) => {
    setOfferType(e.target.value)
  }, [])

  const formSteps = () => {
    switch (step) {
      case 1:
        return <PublishPropertyType onChange={handleTypeChange} value={offerType} />
      case 2: {
        if (offerType === 'rent') {
          return <PublishRentDetails onChange={handleChange} formData={formData} />
        }
        if (offerType === 'sale') {
          return <PublishSaleDetails onChange={handleChange} formData={formData} />
        }
      }
      case 3:
        return <div>Additional Info</div>
      default:
        return <></>
    }
  }

  return (
    <motion.form className='w-full flex flex-col items-center gap-10' layout>
      {formSteps()}
      <div className='flex gap-4 w-full justify-center'>
        {step > 1 && (
          <button className='btn btn-primary text-lg' onClick={handlePrev}>
            Prev
          </button>
        )}
        {step < 4 && (
          <button className='btn btn-primary text-lg' onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </motion.form>
  )
}

export default PublishPropertyForm
