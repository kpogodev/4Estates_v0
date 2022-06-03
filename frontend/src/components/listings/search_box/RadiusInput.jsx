import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

const radiusOptions = [0.25, 0.5, 1, 2, 3, 5, 10, 15, 20, 25]

function RadiusInput() {
  const [radius, setRadius] = useState(2)
  const [searchParams, setSearchParams] = useSearchParams()

  const onRadiusSelect = (e) => {
    setRadius(e.target.value)
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), radius: e.target.value })
  }

  const coordinates_present = searchParams.get('lat') && searchParams.get('lng') ? true : false

  useEffect(() => {
    if (!searchParams.get('radius') && coordinates_present) {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), radius: 2 })
    }

    if (searchParams.get('radius')) {
      setRadius(+searchParams.get('radius'))
    }
  }, [searchParams, coordinates_present, setSearchParams])

  return (
    <div className='form-control'>
      <label className='label py-0 text-sm'>Radius:</label>
      <select name='radius' className={`select select-bordered select-sm text-black`} value={radius} onChange={onRadiusSelect} disabled={!coordinates_present}>
        {radiusOptions.map((option) => (
          <option key={nanoid()} value={option}>
            {`${option} ${option <= 1 ? 'mile' : 'miles'}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RadiusInput


