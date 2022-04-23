import { useId } from 'react'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import moment from 'moment'

function RentFormConfirmation({ formData }) {
  const keyId = useId()
  return (
    <motion.div className='flex flex-col w-full max-w-xl' variants={formContentChange} initial='hidden' animate='visible' exit='exit' key={keyId}>
      <div className='w-full flex justify-between font-semibold lg:text-lg'>
        <span>Furnished:</span>
        <span>{formData.furnished ? 'Yes' : 'No'}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full flex justify-between font-semibold lg:text-lg'>
        <span>Contract Length:</span>
        <span>{`${formData.rental_type.charAt(0).toUpperCase()}${formData.rental_type.slice(1)}`} Term</span>
      </div>
      <div className='divider'></div>
      <div className='w-full flex justify-between font-semibold lg:text-lg'>
        <span>Rent:</span>
        <span>£{formData.price}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full flex justify-between font-semibold lg:text-lg'>
        <span>Deposit:</span>
        <span>£{formData.deposit}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full flex justify-between font-semibold lg:text-lg'>
        <span>Available From:</span>
        <span>{moment(formData.available_from).format('Do MMM YYYY')}</span>
      </div>
      <div className='divider'></div>
      <div className='w-full flex justify-between font-semibold lg:text-lg'>
        <span>Tenancy Infomation:</span>
        <span>{formData?.tenancy_info?.blocks?.length > 0 ? 'Included' : 'Not Included'}</span>
      </div>
    </motion.div>
  )
}

export default RentFormConfirmation
