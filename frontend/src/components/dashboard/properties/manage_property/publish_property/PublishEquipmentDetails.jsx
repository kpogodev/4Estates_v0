import InputRadio from 'components/inputs/InputRadio'
import furniture_icon from 'assets/furniture-icon.svg'
import { motion } from 'framer-motion'
import { useId } from 'react'
import { formContentChange } from 'utils/animationVariants'

function PublishEquipmentDetails({ onChange, formData }) {
  const keyId = useId()
  const handleChange = (e) => {
    onChange(e.target.name, JSON.parse(e.target.value))
  }

  return (
    <motion.div
      className='flex flex-col items-center text-center gap-8 max-w-sm'
      key={keyId}
      variants={formContentChange}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <p className='text-center font-medium text-2xl max-w-[45ch]'>Is the property fully furnished?</p>
      <img className='block w-16 h-16 pointer-events-none' src={furniture_icon} alt='' />
      <div className='flex gap-3 mx-auto'>
        <div className='form-control'>
          <label className='label flex flex-col gap-2 items-center cursor-pointer'>
            <InputRadio name='furnished' value={true} checked={formData.furnished} handleChange={handleChange} />
            <span className='label-text text-center font-semibold text-xl'>Yes</span>
          </label>
        </div>
        <div className='form-control'>
          <label className='label flex flex-col gap-2 items-center cursor-pointer'>
            <InputRadio name='furnished' value={false} checked={!formData.furnished} handleChange={handleChange} />
            <span className='label-text text-center font-semibold text-xl'>No</span>
          </label>
        </div>
      </div>
    </motion.div>
  )
}

export default PublishEquipmentDetails
