import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InputSelect from 'components/inputs/InputSelect'

function PropertyTypeInput() {
  const [propertyType, setPropertyType] = useState('default')
  const [searchParams, setSearchParams] = useSearchParams()

  const location_present = searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius') ? true : false

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value)

    if (e.target.value === 'default') {
      let current = Object.fromEntries(searchParams.entries())
      current.property_type && delete current.property_type
      return setSearchParams(current)
    }

    if (e.target.value === 'commercial' || e.target.value === 'land') {
      let current = Object.fromEntries(searchParams.entries())
      current['property_bedrooms[lte]'] && delete current['property_bedrooms[lte]']
      current['property_bedrooms[gte]'] && delete current['property_bedrooms[gte]']
      return setSearchParams({ ...current, property_type: e.target.value })
    }

    setSearchParams({ ...Object.fromEntries(searchParams.entries()), property_type: e.target.value })
  }

  useEffect(() => {
    if (location_present) {
      searchParams.get('property_type') && setPropertyType(searchParams.get('property_type'))
    }
  }, [searchParams, location_present, setPropertyType])

  return (
    <div className='relative form-control'>
      <label className='label py-0 text-sm'>Property Type:</label>
      <InputSelect
        className='text-black select-sm'
        name='property_type'
        value={propertyType}
        handleChange={handlePropertyTypeChange}
        options={['detached', 'semi-detached', 'terraced', 'flat', 'apartment', 'bungalow', 'land', 'commercial']}
        placeholderOption='All'
        disabled={!location_present}
      />
    </div>
  )
}

export default PropertyTypeInput
