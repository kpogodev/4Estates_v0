import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const radiusOptions = [0.25, 0.5, 1, 2, 3, 5, 10, 15, 20, 25]

function RadiusInput() {
  const [radius, setRadius] = useState(2)
  const [searchParams, setSearchParams] = useSearchParams()

  const coordinates_present = searchParams.get('lat') && searchParams.get('lng') ? true : false

  const onRadiusSelect = (e) => {
    setRadius(e.target.value)
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), radius: e.target.value })
  }

  useEffect(() => {
    if (!coordinates_present) {
      const current = Object.fromEntries(searchParams.entries())
      current.radius && delete current.radius
      setSearchParams(current)
      setRadius(2)
    }

    if (!searchParams.get('radius') & coordinates_present) {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), radius: 2 })
    }

    if (searchParams.get('radius')) {
      setRadius(+searchParams.get('radius'))
    }
  }, [searchParams, coordinates_present, setSearchParams])

  return (
    <div className='form-control max-w-[140px] w-full'>
      <label className='label py-0'>Radius:</label>
      <select name='radius' className={`select select-bordered text-black`} value={radius} onChange={onRadiusSelect} disabled={!coordinates_present}>
        {radiusOptions.map((option) => (
          <option key={uuidv4()} value={option}>
            {`${option} ${option <= 1 ? 'mile' : 'miles'}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RadiusInput
