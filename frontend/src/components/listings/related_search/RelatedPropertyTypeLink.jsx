import { useCallback } from 'react'
import { Link } from 'react-router-dom'

function RelatedPropertyTypeLink({ property_type, searchParams }) {
  const location = searchParams.get('location') ?? null

  const searchString = useCallback(() => {
    const current = Object.fromEntries(searchParams)

    let newString = {
      ...current,
      property_type,
    }

    return new URLSearchParams(newString).toString()
  }, [searchParams, property_type])

  return (
    <Link to={`/rent?${searchString()}`} className='link link-primary font-semibold leading-tight'>
      {` ${
        property_type
          ? ` ${property_type.charAt(0).toUpperCase() + property_type.slice(1)}${
              property_type === 'detached' || property_type === 'semi-detached' || property_type === 'terraced' ? ' house' : ''
            }`
          : ''
      } ${location ? `in ${location.split(',').join('')}` : ''}`}
    </Link>
  )
}

export default RelatedPropertyTypeLink
