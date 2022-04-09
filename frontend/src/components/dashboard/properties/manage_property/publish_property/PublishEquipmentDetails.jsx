import InputRadio from 'components/form/InputRadio'

function PublishEquipmentDetails({ onChange, formData }) {
  const handleChange = (e) => {
    onChange(e.target.name, JSON.parse(e.target.value))
  }

  return (
    <div className='flex flex-col items-center text-center gap-3'>
      <p className='text-center font-medium text-2xl max-w-[45ch]'>Is the property fully furnished?</p>
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
    </div>
  )
}

export default PublishEquipmentDetails
