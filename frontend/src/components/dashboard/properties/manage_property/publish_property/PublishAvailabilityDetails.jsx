import { useId } from 'react'
import DatePicker from 'react-datepicker'
import { GoCalendar } from 'react-icons/go'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import 'react-datepicker/dist/react-datepicker.css'
import availability_icon from 'assets/availability-icon.svg'

function PublishAvailabilityDetails({ formData, onChange }) {
  const keyId = useId()

  return (
    <motion.div
      className='flex flex-col gap-8 items-center text-center max-w-sm'
      key={keyId}
      variants={formContentChange}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <p className='text-center font-medium text-2xl max-w-[45ch]'>When the property will become available to rent?</p>
      <img className='block w-16 h-16 pointer-events-none' src={availability_icon} alt='' />
      <div className='form-control max-w-sm w-full'>
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
            dateFormat='dd/MM/yyyy'
            minDate={new Date()}
            onChange={(date) => onChange('available_from', date.setHours(0, 0, 0, 0))}
            portalId='calendar-portal'
            popperPlacement='top'
            popperModifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 0],
                },
              },
              {
                name: 'preventOverflow',
                options: {
                  rootBoundary: 'viewport',
                  tether: false,
                  altAxis: true,
                },
              },
            ]}
            selected={formData.available_from}
          />
        </label>
      </div>
    </motion.div>
  )
}

export default PublishAvailabilityDetails
