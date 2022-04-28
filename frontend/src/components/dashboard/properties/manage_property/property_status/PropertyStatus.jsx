import PropertyStatusPublished from './PropertyStatusPublished'
import PropertyStatusNotPublished from './PropertyStatusNotPublished'

function PropertyStatus({ propertyId, isPublished }) {
  return (
    <div className='w-full flex flex-col items-start justify-start gap-4'>
      <h3 className='text-xl xl:text-2xl font-semibold'>Property Status</h3>
      {isPublished ? <PropertyStatusPublished propertyId={propertyId} /> : <PropertyStatusNotPublished propertyId={propertyId} />}
    </div>
  )
}

export default PropertyStatus
