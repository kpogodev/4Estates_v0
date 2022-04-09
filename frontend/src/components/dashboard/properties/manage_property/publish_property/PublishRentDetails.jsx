import { useId } from 'react'
import { motion } from 'framer-motion'
import { formContentChange } from '../../../../../utils/animationVariants'
import InputNumber from '../../../../form/InputNumber'
import InputRadio from '../../../../form/InputRadio'
import DatePicker from 'react-datepicker'
import { GoCalendar } from 'react-icons/go'
import 'react-datepicker/dist/react-datepicker.css'

function PublishRentDetails({ onChange, formData }) {
  const key = useId()

  const handleChange = (e) => {
    if (e.target.name === 'price' || e.target.name === 'deposit') {
      return onChange(e.target.name, +e.target.value)
    }

    if (e.target.name === 'furnished') {
      return onChange(e.target.name, JSON.parse(e.target.value))
    }
    return onChange(e.target.name, e.target.value)
  }

  return (
    <motion.div className='w-[90%] lg:max-w-xs flex flex-col gap-3' variants={formContentChange} initial='hidden' animate='visible' exit='exit' key={key}>
      <p className='text-center font-medium text-2xl max-w-[45ch]'>We just need a few more details to proceed with your property listing:</p>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Monthly Rent</span>
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
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Deposit</span>
          <span className='label-alt text-error text-sm italic'>Required *</span>
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
      <div className='flex flex-col items-center text-center'>
        <p className=''>Is the property fully furnished?</p>
        <div className='flex gap-3 mx-auto'>
          <div className='form-control'>
            <label className='label flex flex-col gap-2 items-center cursor-pointer'>
              <InputRadio name='furnished' value={true} checked={formData.furnished} handleChange={handleChange} />
              <span className='label-text text-center'>Yes</span>
            </label>
          </div>
          <div className='form-control'>
            <label className='label flex flex-col gap-2 items-center cursor-pointer'>
              <InputRadio name='furnished' value={false} checked={!formData.furnished} handleChange={handleChange} />
              <span className='label-text text-center'>No</span>
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center text-center'>
        <p className=''>Length of the contract:</p>
        <div className='flex gap-3 mx-auto'>
          <div className='form-control'>
            <label className='label flex flex-col gap-2 items-center cursor-pointer'>
              <InputRadio name='rental_type' value='short' checked={formData.rental_type === 'short'} handleChange={handleChange} />
              <span className='label-text text-center'>Short Term</span>
            </label>
          </div>
          <div className='form-control'>
            <label className='label flex flex-col gap-2 items-center cursor-pointer'>
              <InputRadio name='rental_type' value='long' checked={formData.rental_type === 'long'} handleChange={handleChange} />
              <span className='label-text text-center'>Long Term</span>
            </label>
          </div>
        </div>
      </div>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Availabe From:</span>
          <span className='label-alt text-error text-sm italic'>Required *</span>
        </label>
        <label className='input-group'>
          <span>
            <GoCalendar />
          </span>
          <DatePicker
            className='input input-bordered w-full'
            selected={formData.available_from}
            onChange={(date) => onChange('available_from', date)}
            dateFormat='dd/MM/yyyy'
          />
        </label>
      </div>
    </motion.div>
  )
}

export default PublishRentDetails
