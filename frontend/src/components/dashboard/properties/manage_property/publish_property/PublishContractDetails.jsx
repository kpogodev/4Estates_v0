import InputRadio from 'components/inputs/InputRadio'
import contract_icon from 'assets/contract-icon.svg'
import { motion } from 'framer-motion'
import { useId } from 'react'
import { formContentChange } from 'utils/animationVariants'

function PublishContractDetails({ formData, onChange }) {
  const keyId = useId()
  const handleChange = (e) => {
    return onChange(e.target.name, e.target.value)
  }
  return (
    <motion.div
      key={keyId}
      className='flex flex-col items-center text-center gap-8 max-w-sm'
      variants={formContentChange}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <p className='text-center font-medium text-2xl max-w-[45ch]'>Contract Length</p>
      <img className='block w-16 h-16 pointer-events-none' src={contract_icon} alt='' />
      <div className='flex gap-3 mx-auto'>
        <div className='form-control'>
          <label className='label flex flex-col gap-2 items-center cursor-pointer'>
            <InputRadio name='rental_type' value='short' checked={formData.rental_type === 'short'} handleChange={handleChange} />
            <span className='label-text text-center font-semibold text-xl'>Short Term</span>
          </label>
        </div>
        <div className='form-control'>
          <label className='label flex flex-col gap-2 items-center cursor-pointer'>
            <InputRadio name='rental_type' value='long' checked={formData.rental_type === 'long'} handleChange={handleChange} />
            <span className='label-text text-center font-semibold text-xl'>Long Term</span>
          </label>
        </div>
      </div>
    </motion.div>
  )
}

export default PublishContractDetails
