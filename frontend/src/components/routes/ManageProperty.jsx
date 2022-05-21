import { useEffect, useId } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import Loading from 'components/shared/Loading'
import useMediaQuery from 'hooks/useMediaQuery'
import PropertySlider from 'components/dashboard/properties/manage_property/property_gallery/PropertySlider'
import PropertySliderUpload from 'components/dashboard/properties/manage_property/property_gallery/PropertySliderUpload'
import PropertyDetails from 'components/dashboard/properties/manage_property/property_details/PropertyDetails'
import PropertyLocation from 'components/dashboard/properties/manage_property/property_location/PropertyLocation'
import PropertyStatus from 'components/dashboard/properties/manage_property/property_status/PropertyStatus'
import PropertyDelete from 'components/dashboard/properties/manage_property/property_delete/PropertyDelete'
import {
  getProperty,
  resetError,
  resetSuccess,
  resetProperty,
  selectProperty,
  selectPropertiesIsSuccess,
  selectPropertiesIsError,
  selectPropertiesMessage,
} from 'context/properties/propertiesSlice'

function ManageProperty() {
  const { matches } = useMediaQuery('(min-width: 1024px)')
  const pageId = useId()

  const property = useSelector(selectProperty)
  const isSuccess = useSelector(selectPropertiesIsSuccess)
  const isError = useSelector(selectPropertiesIsError)
  const message = useSelector(selectPropertiesMessage)
  const dispatch = useDispatch()

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProperty(params.id))

    return () => {
      dispatch(resetProperty())
      dispatch(resetError())
      dispatch(resetSuccess())
    }
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

  useEffect(() => {
    if (isSuccess && !property) {
      navigate('/user')
    }
  }, [isSuccess, property, navigate])

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
        <Link to='/user' className='btn btn-link px-0'>
          Back to Dashboard
        </Link>
      </div>
      {matches ? (
        <>
          <div className='flex flex-col col-span-8 gap-10'>
            <PropertySlider className='max-h-[600px] bg-black shadow-lg aspect-[9.9/6]' />
            <PropertySliderUpload className='row-span-1' />
            <PropertyLocation />
            <PropertyDelete />
          </div>
          <div className='col-span-4 flex flex-col gap-10'>
            <PropertyStatus isPublished={property.is_published} />
            <PropertyDetails className='row-span-2' />
          </div>
        </>
      ) : (
        <>
          <div className='col-span-4 flex flex-col gap-10'>
            <PropertyStatus isPublished={property.is_published} />
            <PropertyDetails className='row-span-2' />
          </div>
          <div className='flex flex-col col-span-8 gap-10'>
            <PropertySlider className='max-h-[600px] bg-black shadow-lg aspect-[9.9/6]' />
            <PropertySliderUpload className='row-span-1' />
            <PropertyLocation />
            <PropertyDelete />
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ManageProperty
