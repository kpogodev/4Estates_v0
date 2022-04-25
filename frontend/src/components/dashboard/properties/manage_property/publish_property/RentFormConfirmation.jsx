import { useId } from 'react'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import moment from 'moment'
import GoToStepButton from './GoToStepButton'

function RentFormConfirmation({ formData, isValid, goToStep }) {
  const keyId = useId()
  return (
    <motion.div className='flex flex-col w-full max-w-xl' variants={formContentChange} initial='hidden' animate='visible' exit='exit' key={keyId}>
      <p className='text-center font-medium text-2xl max-w-[45ch] mb-5 mx-auto'>Summary</p>
      <div className='w-full gap-2 flex items-center justify-between font-semibold lg:text-lg'>
        <span>Furnished:</span>
        <span>{formData.furnished ? 'Yes' : 'No'}</span>
      </div>
      <div className='divider'></div>
      <div
        className={`${isValid.price === false ? 'text-error' : ''} w-full gap-2 flex items-center justify-between font-semibold lg:text-lg transition-colors`}
      >
        <span>Rent:</span>
        {isValid.price === false && <GoToStepButton className='link text-primary ml-auto' goToStep={goToStep} step={2} text='Go and correct >>' />}
        <span>£{formData.price}</span>
      </div>
      <div className='divider'></div>
      <div
        className={`${isValid.deposit === false ? 'text-error' : ''} w-full gap-2 flex items-center justify-between font-semibold lg:text-lg transition-colors`}
      >
        <span>Deposit:</span>
        {isValid.deposit === false && <GoToStepButton className='link text-primary ml-auto' goToStep={goToStep} step={2} text='Go and correct >>' />}
        <span>£{formData.deposit}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full gap-2 flex items-center justify-between font-semibold lg:text-lg'>
        <span>Contract Length:</span>
        <span>{`${formData.rental_type.charAt(0).toUpperCase()}${formData.rental_type.slice(1)}`} Term</span>
      </div>
      <div className='divider'></div>
      <div className='w-full gap-2 flex items-center justify-between font-semibold lg:text-lg'>
        <span>Available From:</span>
        <span>{moment(formData.available_from).format('Do MMM YYYY')}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full gap-2 flex items-center justify-between font-semibold lg:text-lg'>
        <span>Tenancy Infomation:</span>
        <span>{formData?.tenancy_info?.blocks?.length > 0 ? 'Included' : 'Not Included'}</span>
      </div>
    </motion.div>
  )
}

export default RentFormConfirmation
