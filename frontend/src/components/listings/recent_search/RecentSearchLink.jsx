import React from 'react'
import { Link } from 'react-router-dom'

function RecentSearchLink({ searchString }) {
  const searchParams = new URLSearchParams(searchString)
  const radius = searchParams.get('radius')
  const location = searchParams.get('location')
  const type = searchParams.get('property_type')
    ? `, ${
        searchParams.get('property_type').includes('-')
          ? searchParams
              .get('property_type')
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join('-')
          : searchParams
              .get('property_type')
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
      }`
    : ''
  const minBedrooms = searchParams.get('property_bedrooms[gte]') ? `, Bedrooms ${searchParams.get('property_bedrooms[gte]')}+` : ''
  const maxPrice = searchParams.get('price[lte]') ? `, up to £${searchParams.get('price[lte]')} PCM` : ''

  return (
    <Link to={`./?${searchString}`} className='link link-primary font-semibold leading-tight'>
      Within {radius} miles from {location.split(',').join(' ')}
      {type}
      {minBedrooms}
      {maxPrice}
    </Link>
  )
}

export default RecentSearchLink
