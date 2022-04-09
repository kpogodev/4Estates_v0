import InputRadio from 'components/form/InputRadio'
import DatePicker from 'react-datepicker'
import { GoCalendar } from 'react-icons/go'
import 'react-datepicker/dist/react-datepicker.css'

function PublishContractDetails({ formData, onChange }) {
  const handleChange = (e) => {
    return onChange(e.target.name, e.target.value)
  }
  return (
    <div className='w-full max-w-sm flex flex-col gap-5'>
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
            portalId='calendar-portal'
            popperPlacement='top-end'
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
          />
        </label>
      </div>
      <div className='flex flex-col items-center text-center'>
        <p className=''>Length of the contract:</p>
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
      </div>
    </div>
  )
}

export default PublishContractDetails
