import InputNumber from 'components/form/InputNumber'
import finance_icon from 'assets/finance-icon.svg'
import { motion } from 'framer-motion'
import { useId } from 'react'
import { formContentChange } from 'utils/animationVariants'

function PublishFinanceDetails({ formData, onChange, forRent }) {
  const keyId = useId()

  const handleChange = (e) => {
    return onChange(e.target.name, +e.target.value)
  }

  return (
    <motion.div
      className='w-full max-w-sm flex flex-col gap-8 items-center'
      key={keyId}
      variants={formContentChange}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <p className='text-center font-medium text-2xl max-w-[45ch]'>Provide financing details</p>
      <img className='block w-16 h-16 pointer-events-none' src={finance_icon} alt='' />
      <div className='w-full'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>{forRent ? 'Monthly Rent' : 'Price'}</span>
            <span className='label-alt text-error text-sm italic'>Required *</span>
          </label>
          <label className='input-group'>
            <span className='font-medium'>£</span>
            <InputNumber
              className='input input-bordered w-full'
              name='price'
              placeholder='950'
              value={formData.price}
              handleChange={handleChange}
              minValue={0}
              maxValue={999999999}
            />
          </label>
        </div>
        {forRent && (
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Deposit</span>
              <span className='label-alt text-sm italic'>Optional*</span>
            </label>
            <label className='input-group'>
              <span className='font-medium'>£</span>
              <InputNumber
                className='input input-bordered w-full'
                name='deposit'
                placeholder='1187.50'
                value={formData.deposit}
                handleChange={handleChange}
                minValue={0}
                maxValue={999999999}
              />
            </label>
          </div>
        )}
      </div>
    </motion.div>
  )
}

PublishFinanceDetails.defaultProps = {
  isRent: false,
}

export default PublishFinanceDetails
