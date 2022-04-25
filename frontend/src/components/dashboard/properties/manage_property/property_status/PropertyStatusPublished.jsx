import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeRental, resetError, resetSuccess } from 'context/rents/rentsSlice'
import { setPropertyIsPublished } from 'context/properties/propertiesSlice'
import Modal from 'components/layout/Modal'
import PropertyPublishedRent from './PropertyPublishedRent'

function PropertyStatusPublished() {
  const { rental, isSuccess, isError, isLoading } = useSelector((state) => state.rents)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleRemove = () => {
    dispatch(removeRental(rental._id))
  }

  useEffect(() => {
    if (isSuccess && !rental) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
      dispatch(resetSuccess())
    }
  }, [isSuccess, isError, rental, dispatch, handleModalToggle])

  return (
    <div className='w-full'>
      <PropertyPublishedRent rental={rental} />
      <button className='btn btn-error btn-outline btn-sm block ml-auto' onClick={handleModalToggle}>
        Remove Offer
      </button>
      <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='max-w-md flex flex-col gap-5'>
        <h3 className='text-xl xl:text-2xl font-semibold'>Remove Offer</h3>
        <p className='lg:text-lg text-error'>
          Your property <span className='font-semibold'>{rental?.property.location.formatted_address}</span> will be pernamently deleted from our listing
        </p>
        <div className='flex gap-4 ml-auto'>
          <button className='btn btn-ghost btn-sm' onClick={handleModalToggle}>
            Cancel
          </button>
          <button className='btn btn-error btn-outline btn-sm' onClick={handleRemove}>
            Remove
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PropertyStatusPublished
