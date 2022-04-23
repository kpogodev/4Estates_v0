import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { removeRental } from 'context/rents/rentsSlice'
import { setPropertyIsPublished } from 'context/properties/propertiesSlice'
import Modal from 'components/layout/Modal'

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
      handleModalToggle()
      dispatch(setPropertyIsPublished(false))
    }
  }, [isSuccess, rental, dispatch, handleModalToggle])

  return (
    <div className='w-full'>
      <div className='w-full flex items-center gap-4 justify-between'>
        <span className='badge badge-success badge-lg font-semibold'>Published</span>
        <p className='font-semibold italic text-gray-500'>{moment(rental?.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <div className='w-full flex flex-col items-start py-4'>
        <p>
          Furnished: <span className='font-semibold'>{rental?.furnished ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Monthly Rent: <span className='font-semibold'>£{rental?.price}</span>
        </p>
        <p>
          Deposit: <span className='font-semibold'>£{rental?.deposit}</span>
        </p>
        <p>
          Contract: <span className='font-semibold'>{`${rental?.rental_type.charAt(0).toUpperCase()}${rental?.rental_type.slice(1)}`} Term</span>
        </p>
        <p>
          Available From: <span className='font-semibold'>{moment(rental?.available_from).format('Do MMM YYYY')}</span>
        </p>
        <p>
          Tenancy Information: <span className='font-semibold'>{rental?.tenancy_info?.blocks.length > 0 ? 'Included' : 'Not Included'}</span>
        </p>
      </div>
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
