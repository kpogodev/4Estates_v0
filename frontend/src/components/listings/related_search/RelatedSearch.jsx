import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import RelatedBedroomsLink from './RelatedBedroomsLink'

function RelatedSearch() {
  const [relatedBedrooms, setRelatedBedrooms] = useState([])

  const [searchParams] = useSearchParams()
  const location_present = searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius') ? true : false
  const minBedrooms = +searchParams.get('property_bedrooms[gte]') ?? 0
  const property_type = searchParams.get('property_type') ?? null

  useEffect(() => {
    if (location_present && property_type !== 'commercial' && property_type !== 'land') {
      if (minBedrooms && minBedrooms >= 2 && minBedrooms <= 4) {
        setRelatedBedrooms([minBedrooms - 1, minBedrooms + 1, minBedrooms + 2])
      } else if (minBedrooms && minBedrooms >= 5) {
        setRelatedBedrooms([minBedrooms - 3, minBedrooms - 2, minBedrooms - 1])
      } else {
        setRelatedBedrooms([1, 2, 3, 4, 5])
      }
    } else {
      setRelatedBedrooms([])
    }
  }, [minBedrooms, location_present, property_type])

  if (!location_present) return null

  return (
    <nav className='col-span-1 flex flex-col gap-4 p-3 xl:p-5 shadow-custom rounded-lg bg-white'>
      <h3 className='text-2xl font-bold'>Related Searches</h3>
      <ul className='flex flex-col'>
        {relatedBedrooms.map((bedrooms) => (
          <li className='border-t py-2 first-of-type:border-t-0' key={nanoid()}>
            <RelatedBedroomsLink bedrooms={bedrooms} property_type={property_type} searchParams={searchParams} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RelatedSearch
