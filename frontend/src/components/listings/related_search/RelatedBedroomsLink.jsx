import React from 'react'
import { Link } from 'react-router-dom'

function RelatedBedroomsLink({ bedrooms, property_type, searchParams }) {
  const location = searchParams.get('location') ?? null
  const searchString = () => {
    const current = Object.fromEntries(searchParams)

    let newString = {
      ...current,
      'property_bedrooms[gte]': bedrooms,
      'property_bedrooms[lte]': bedrooms,
    }

    return new URLSearchParams(newString).toString()
  }

  return (
    <Link to={`./?${searchString()}`} className='link link-primary font-semibold leading-tight'>
      {`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''} ${
        property_type
          ? ` ${property_type}${property_type === 'detached' || property_type === 'semi-detached' || property_type === 'terraced' ? ' house' : ''}`
          : ''
      } ${location ? `in ${location.split(',').join('')}` : ''}`}
    </Link>
  )
}

export default RelatedBedroomsLink
