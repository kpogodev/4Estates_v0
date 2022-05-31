import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InputSelect from 'components/inputs/InputSelect'

function PropertyTypeInput() {
  const [propertyType, setPropertyType] = useState('default')
  const [searchParams, setSearchParams] = useSearchParams()

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value)

    if (e.target.value === 'default') {
      let current = Object.fromEntries(searchParams.entries())
      current.property_type && delete current.property_type
      return setSearchParams(current)
    }

    setSearchParams({ ...Object.fromEntries(searchParams.entries()), property_type: e.target.value })
  }

  useEffect(() => {
    searchParams.get('property_type') && setPropertyType(searchParams.get('property_type'))
  }, [searchParams])

  return (
    <div className='form-control max-w-[140px] w-full'>
      <label className='label py-0'>Property Type:</label>
      <InputSelect
        className='text-black'
        name='property_type'
        value={propertyType}
        handleChange={handlePropertyTypeChange}
        options={['detached', 'semi-detached', 'terraced', 'flat', 'apartment', 'bungalow', 'land', 'commercial']}
        placeholderOption='All'
      />
    </div>
  )
}

export default PropertyTypeInput
