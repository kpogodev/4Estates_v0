import { useEffect, useId } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import Loading from 'components/shared/Loading'
import useMediaQuery from 'hooks/useMediaQuery'
import { getProperty, resetError, resetSuccess, resetProperty } from 'context/properties/propertiesSlice'
import PropertySlider from 'components/dashboard/properties/manage_property/property_gallery/PropertySlider'
import PropertySliderUpload from 'components/dashboard/properties/manage_property/property_gallery/PropertySliderUpload'
import PropertyDetails from 'components/dashboard/properties/manage_property/property_details/PropertyDetails'
import PropertyLocation from 'components/dashboard/properties/manage_property/property_location/PropertyLocation'
import PropertyStatus from 'components/dashboard/properties/manage_property/property_status/PropertyStatus'
import PropertyDelete from 'components/dashboard/properties/manage_property/property_delete/PropertyDelete'

function ManageProperty() {
  const { matches } = useMediaQuery('(min-width: 1024px)')
  const pageId = useId()

  const { property, message, isSuccess, isError } = useSelector((state) => state.properties)
  const dispatch = useDispatch()

  const params = useParams()

  useEffect(() => {
    dispatch(getProperty(params.id))

    return () => dispatch(resetProperty())
  }, [dispatch, params.id])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(resetSuccess())
    }
    if (isError) {
      toast.error(message)
      dispatch(resetError())
    }
  }, [isSuccess, isError, message, dispatch])

  if (!property) return <Loading />

  return (
    <motion.div
      key={pageId}
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10'
    >
      <div className='col-span-12 flex justify-between items-center gap-x-20 flex-wrap'>
        <h2 className='block text-left font-bold text-2xl xl:text-4xl xl:py-4'>
          Manage Property
          <span className='!block text-lg text-gray-500 font-medium'>{property.location.formatted_address}</span>
        </h2>
        <Link to='/dashboard' className='btn btn-link px-0'>
          Back to Dashboard
        </Link>
      </div>
      {matches ? (
        <>
          <div className='flex flex-col col-span-8 gap-10'>
            <PropertySlider className='max-h-[600px] bg-black shadow-lg aspect-[9.9/6]' />
            <PropertySliderUpload className='row-span-1' />
            <PropertyLocation />
            <PropertyDelete propertyId={property._id} />
          </div>
          <div className='col-span-4 flex flex-col gap-10'>
            <PropertyStatus propertyId={property._id} isPublished={property.is_published} />
            <PropertyDetails className='row-span-2' />
          </div>
        </>
      ) : (
        <>
          <div className='col-span-4 flex flex-col gap-10'>
            <PropertyStatus propertyId={property._id} isPublished={property.is_published} />
            <PropertyDetails className='row-span-2' />
          </div>
          <div className='flex flex-col col-span-8 gap-10'>
            <PropertySlider className='max-h-[600px] bg-black shadow-lg aspect-[9.9/6]' />
            <PropertySliderUpload className='row-span-1' />
            <PropertyLocation />
            <PropertyDelete propertyId={property._id} />
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ManageProperty
