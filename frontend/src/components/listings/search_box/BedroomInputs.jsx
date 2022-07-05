import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InputSelect from 'components/inputs/InputSelect'

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function BedroomInputs() {
  const [minBedrooms, setMinBedrooms] = useState(0)
  const [maxBedrooms, setMaxBedrooms] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const property_type = searchParams.get('property_type') ?? null
  const location_present = searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius') ? true : false

  const minOptions = useMemo(() => {
    return maxBedrooms > 0 ? range.filter((num) => num <= maxBedrooms) : range
  }, [maxBedrooms])

  const maxOptions = useMemo(() => {
    return range.filter((num) => num >= minBedrooms)
  }, [minBedrooms])

  const handleMinBedroomsChange = useCallback(
    (e) => {
      setMinBedrooms(+e.target.value)

      if (+e.target.value === 0) {
        let current = Object.fromEntries(searchParams.entries())
        current['property_bedrooms[gte]'] && delete current['property_bedrooms[gte]']
        return setSearchParams(current)
      }

      setSearchParams({ ...Object.fromEntries(searchParams.entries()), 'property_bedrooms[gte]': e.target.value })
    },
    [searchParams, setSearchParams]
  )

  const handleMaxBedroomsChange = useCallback(
    (e) => {
      setMaxBedrooms(+e.target.value)

      if (+e.target.value === 0) {
        let current = Object.fromEntries(searchParams.entries())
        current['property_bedrooms[lte]'] && delete current['property_bedrooms[lte]']
        return setSearchParams(current)
      }

      setSearchParams({ ...Object.fromEntries(searchParams.entries()), 'property_bedrooms[lte]': e.target.value })
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    if (location_present) {
      searchParams.get('property_bedrooms[gte]') && setMinBedrooms(+searchParams.get('property_bedrooms[gte]'))
      searchParams.get('property_bedrooms[lte]') && setMaxBedrooms(+searchParams.get('property_bedrooms[lte]'))
    }
  }, [searchParams, location_present, setMinBedrooms, setMaxBedrooms])

  return (
    <div className='flex gap-2 flex-grow-0'>
      <div className='form-control w-full'>
        <label className='label py-0 text-sm'>Min Bedrooms:</label>
        <InputSelect
          className='text-black select-sm min-w-[100px]'
          name='min_bedrooms'
          value={minBedrooms}
          handleChange={handleMinBedroomsChange}
          options={minOptions}
          placeholderOption='No min'
          disabled={property_type === 'commercial' || property_type === 'land' || !location_present}
        />
      </div>
      <div className='form-control w-full'>
        <label className='label py-0 text-sm'>Max Bedrooms:</label>
        <InputSelect
          className='text-black select-sm min-w-[100px]'
          name='max_bedrooms'
          value={maxBedrooms}
          handleChange={handleMaxBedroomsChange}
          options={maxOptions}
          placeholderOption='No max'
          disabled={property_type === 'commercial' || property_type === 'land' || !location_present}
        />
      </div>
    </div>
  )
}

export default BedroomInputs
