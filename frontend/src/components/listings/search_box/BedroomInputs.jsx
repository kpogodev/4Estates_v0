import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InputSelect from 'components/form/InputSelect'

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function BedroomInputs() {
  const [minBedrooms, setMinBedrooms] = useState(0)
  const [maxBedrooms, setMaxBedrooms] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const minOptions = useMemo(() => {
    return maxBedrooms > 0 ? range.filter((num) => num < maxBedrooms) : range
  }, [maxBedrooms])

  const maxOptions = useMemo(() => {
    return range.filter((num) => num > minBedrooms)
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
    searchParams.get('property_bedrooms[gte]') && setMinBedrooms(+searchParams.get('property_bedrooms[gte]'))
    searchParams.get('property_bedrooms[lte]') && setMaxBedrooms(+searchParams.get('property_bedrooms[lte]'))
  }, [searchParams])

  return (
    <div className='flex gap-4 max-w-[296px] w-full'>
      <div className='form-control max-w-[140px] w-full'>
        <label className='label py-0'>Min Bedrooms:</label>
        <InputSelect
          className='text-black'
          name='min_bedrooms'
          value={minBedrooms}
          handleChange={handleMinBedroomsChange}
          options={minOptions}
          placeholderOption='No min'
        />
      </div>
      <div className='form-control max-w-[140px] w-full'>
        <label className='label py-0'>Max Bedrooms:</label>
        <InputSelect
          className='text-black'
          name='max_bedrooms'
          value={maxBedrooms}
          handleChange={handleMaxBedroomsChange}
          options={maxOptions}
          placeholderOption='No max'
        />
      </div>
    </div>
  )
}

export default BedroomInputs
