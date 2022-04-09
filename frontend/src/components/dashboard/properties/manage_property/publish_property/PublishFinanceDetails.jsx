import InputNumber from 'components/form/InputNumber'

function PublishFinanceDetails({ formData, onChange, isRent }) {
  const handleChange = (e) => {
    return onChange(e.target.name, e.target.value)
  }
  return (
    <div className='w-full max-w-sm flex flex-col gap-2'>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>{isRent ? 'Monthly Rent' : 'Price'}</span>
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
      {isRent && (
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
      )}
    </div>
  )
}

PublishFinanceDetails.defaultProps = {
  isRent: false,
}

export default PublishFinanceDetails
