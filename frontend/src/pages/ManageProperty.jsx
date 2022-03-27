import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { getProperty, resetError, resetSuccess, resetProperty } from '../features/properties/propertiesSlice'
import { pageTransition } from '../utils/animationVariants'
import PropertySlider from '../components/dashboard/properties/manage_property/PropertySlider'
import PropertySliderUpload from '../components/dashboard/properties/manage_property/PropertySliderUpload'
import PropertyDetails from '../components/dashboard/properties/manage_property/PropertyDetails'
import Loading from '../components/shared/Loading'

function ManageProperty() {
  const { property, message, isLoading, isSuccess, isError } = useSelector((state) => state.properties)
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
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='w-full grid grid-cols-12 gap-5'
    >
      <div className='col-span-12 flex justify-between items-center gap-5 flex-wrap'>
        <h2 className='text-left font-bold text-2xl xl:text-4xl xl:py-4 flex item-center gap-4'>
          {property.location.formatted_address}
        </h2>
        <Link to='/dashboard' className='btn btn-link px-0'>
          Back to Dashboard
        </Link>
      </div>
      <div className='flex flex-col col-span-8'>
        <PropertySlider className='max-h-[600px] shadow-lg bg-black' images={property.images} />
      </div>
      <div className='col-span-4 flex flex-col gap-10'>
        <PropertySliderUpload className='row-span-1' />
        <PropertyDetails className='row-span-2' />
      </div>
    </motion.div>
  )
}

export default ManageProperty
