import { Link } from 'react-router-dom'

function PropertyStatusNotPublished({ property }) {
  return (
    <div className='flex items-center gap-4'>
      <span className='badge badge-lg'>Not Published</span>
      <Link to={`/publish-property/${property._id}`} className='btn btn-link px-0'>
        Publish This Property
      </Link>
    </div>
  )
}

export default PropertyStatusNotPublished
