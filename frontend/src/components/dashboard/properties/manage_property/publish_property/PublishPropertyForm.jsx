import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProperty, resetProperty, selectProperty } from 'redux/properties/propertiesSlice'
import Loading from 'components/common/Loading'
import PublishPropertyType from './PublishPropertyType'
import RentForm from './RentForm'
import SaleForm from './SaleForm'

function PublishPropertyForm() {
  const [listingType, setListingType] = useState(null)

  const property = useSelector(selectProperty)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getProperty(params.id))
    return () => dispatch(resetProperty())
  }, [dispatch, params.id])

  const handleListingTypeChange = useCallback((e) => {
    setListingType(e.target.value)
  }, [])

  if (!property) return <Loading />

  return (
    <div className='w-full max-w-4xl flex flex-col gap-10 mx-auto'>
      <div className='w-full flex items-center justify-between flex-wrap gap-x-20'>
        <h2 className='block text-left font-bold text-2xl xl:text-4xl xl:py-4'>
          Publish Property<span className='!block text-lg text-gray-500 font-medium'>{property.location.formatted_address}</span>
        </h2>
        <Link to={`/user/manage-property/${property._id}`} className='btn btn-link px-0'>
          Back to Property
        </Link>
      </div>
      {!listingType && <PublishPropertyType setListingType={handleListingTypeChange} />}
      {listingType === 'rent' && (
        <RentForm propertyId={property._id} steps={['equipment', 'financing', 'contract', 'availability', 'tenancy info', 'summary']} />
      )}
      {listingType === 'sale' && <SaleForm propertyId={property._id} steps={['financing', 'additional info', 'summary']} />}
    </div>
  )
}

export default PublishPropertyForm
