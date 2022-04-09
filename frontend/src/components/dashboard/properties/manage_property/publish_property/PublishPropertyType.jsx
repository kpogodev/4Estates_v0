import { useId } from 'react'
import sale_icon from 'assets/sale-icon.svg'
import rent_icon from 'assets/rent-icon.svg'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import InputRadio from 'components/form/InputRadio'

const PublishPropertyType = ({ onChange, value }) => {
  const key = useId()
  return (
    <motion.div className='w-full flex flex-col items-center gap-10' variants={formContentChange} initial='hidden' animate='visible' exit='exit' key={key}>
      <p className='text-center font-medium text-2xl max-w-[45ch]'>
        Please choose whether you want to <span className='font-bold'>Rent</span> or <span className='font-bold'>Sell</span> your property:
      </p>
      <div className='flex gap-16'>
        <div className='form-control'>
          <label className='label flex flex-col gap-2 items-center cursor-pointer'>
            <img className='block w-16 h-16' src={rent_icon} alt='' />
            <span className='label-text text-center font-semibold text-xl'>Rent</span>
            <InputRadio name='rent' value='rent' checked={value === 'rent'} handleChange={onChange} />
          </label>
        </div>
        <div className='form-control'>
          <label className='label flex flex-col gap-2 items-center cursor-pointer'>
            <img className='block w-16 h-16' src={sale_icon} alt='' />
            <span className='label-text text-center font-semibold text-xl'>Sell</span>
            <InputRadio name='sale' value='sale' checked={value === 'sale'} handleChange={onChange} />
          </label>
        </div>
      </div>
    </motion.div>
  )
}

export default PublishPropertyType
