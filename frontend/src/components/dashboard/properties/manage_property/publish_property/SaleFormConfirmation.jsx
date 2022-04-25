import { useId } from 'react'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import moment from 'moment'
import GoToStepButton from './GoToStepButton'

function SaleFormConfirmation({ formData, isValid, goToStep }) {
  const keyId = useId()
  return (
    <motion.div className='flex flex-col w-full max-w-xl' variants={formContentChange} initial='hidden' animate='visible' exit='exit' key={keyId}>
      <p className='text-center font-medium text-2xl max-w-[45ch] mb-5 mx-auto'>Summary</p>
      <div
        className={`${isValid.price === false ? 'text-error' : ''} w-full gap-2 flex items-center justify-between font-semibold lg:text-lg transition-colors`}
      >
        <span>Price:</span>
        {isValid.price === false && <GoToStepButton className='link text-primary ml-auto' goToStep={goToStep} step={1} text='Go and correct >>' />}
        <span>£{formData.price}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full gap-2 flex items-center justify-between font-semibold lg:text-lg'>
        <span>Additional Infomation:</span>
        <span>{formData?.additional_info?.blocks?.length > 0 ? 'Included' : 'Not Included'}</span>
      </div>
    </motion.div>
  )
}

export default SaleFormConfirmation
