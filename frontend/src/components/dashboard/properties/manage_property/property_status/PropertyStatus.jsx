import PropertyStatusPublished from './PropertyStatusPublished'
import PropertyStatusNotPublished from './PropertyStatusNotPublished'

function PropertyStatus({ isPublished }) {
  return (
    <div className='w-full flex flex-col items-start justify-start gap-4'>
      <h3 className='text-xl xl:text-2xl font-semibold'>Property Status</h3>
      {isPublished ? <PropertyStatusPublished /> : <PropertyStatusNotPublished />}
    </div>
  )
}

export default PropertyStatus
