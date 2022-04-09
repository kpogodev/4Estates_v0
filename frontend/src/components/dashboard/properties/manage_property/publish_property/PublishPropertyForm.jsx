import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PublishPropertyType from './PublishPropertyType'
import { AnimatePresence, motion } from 'framer-motion'
import PublishEquipmentDetails from './PublishEquipmentDetails'
import PublishFinanceDetails from './PublishFinanceDetails'
import PublishContractDetails from './PublishContractDetails'

function PublishPropertyForm() {
  const [listingType, setListingType] = useState('rent')
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    available_from: new Date(),
    furnished: true,
    rental_type: 'short',
  })

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

  const handleTypeChange = useCallback((e) => {
    setListingType(e.target.value)
  }, [])

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const rentSteps = () => {
    switch (step) {
      case 2:
        return <PublishEquipmentDetails onChange={handleChange} formData={formData} />
      case 3:
        return <PublishFinanceDetails onChange={handleChange} formData={formData} isRent={true} />
      case 4:
        return <PublishContractDetails onChange={handleChange} formData={formData} />
      default:
        return <></>
    }
  }

  return (
    <motion.form className='w-full flex flex-col items-center gap-10' layout>
      {step === 1 && <PublishPropertyType onChange={handleTypeChange} value={listingType} />}
      {listingType === 'rent' && rentSteps()}
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
