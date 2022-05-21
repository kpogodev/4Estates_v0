import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getRental,
  removeRental,
  selectRental,
  selectRentsIsError,
  selectRentsIsSuccess,
  resetError as resetRentsError,
  resetSuccess as resetRentsSuccess,
} from 'redux/rents/rentsSlice'
import {
  getSale,
  removeSale,
  selectSale,
  selectSalesIsError,
  selectSalesIsSuccess,
  resetError as resetSalesError,
  resetSuccess as resetSalesSuccess,
} from 'redux/sales/salesSlice'
import { setPropertyIsPublished } from 'redux/properties/propertiesSlice'
import PropertyPublishedRent from './PropertyPublishedRent'
import PropertyPublishedSale from './PropertyPublishedSale'
import Modal from 'components/shared/Modal'
import { MdDeleteForever } from 'react-icons/md'

function PropertyStatusPublished() {
  const [modalOpen, setModalOpen] = useState(false)

  const rental = useSelector(selectRental)
  const rentsIsSuccess = useSelector(selectRentsIsSuccess)
  const rentsIsError = useSelector(selectRentsIsError)

  const sale = useSelector(selectSale)
  const salesIsSuccess = useSelector(selectSalesIsSuccess)
  const salesIsError = useSelector(selectSalesIsError)

  const dispatch = useDispatch()
  const { id: propertyId } = useParams()

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleRemove = () => {
    rental && dispatch(removeRental(rental._id))
    sale && dispatch(removeSale(sale._id))
  }

  useEffect(() => {
    dispatch(getRental(propertyId))
    dispatch(getSale(propertyId))
  }, [dispatch, propertyId])

  useEffect(() => {
    if (rentsIsSuccess && !rental) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
    }
  }, [rentsIsSuccess, rental, dispatch, handleModalToggle])

  useEffect(() => {
    if (salesIsSuccess && !sale) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
    }
  }, [salesIsSuccess, sale, dispatch, handleModalToggle])

  useEffect(() => {
    if (rentsIsSuccess) dispatch(resetRentsSuccess())
    if (rentsIsError) dispatch(resetRentsError())
    if (salesIsSuccess) dispatch(resetSalesSuccess())
    if (salesIsError) dispatch(resetSalesError())
  }, [dispatch, rentsIsSuccess, salesIsSuccess, rentsIsError, salesIsError])

  return (
    <div className='w-full'>
      {rental && <PropertyPublishedRent rental={rental} />}
      {sale && <PropertyPublishedSale sale={sale} />}
      <button className='btn btn-error btn-outline btn-sm flex items-center gap-1 ml-auto text-lg capitalize' onClick={handleModalToggle}>
        <MdDeleteForever className='w-6 h-6 pointer-events-none' />
        <span>Remove Offer</span>
      </button>
      <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='max-w-md flex flex-col gap-5'>
        <h3 className='text-xl xl:text-2xl font-semibold'>Remove Offer</h3>
        <p className='lg:text-lg text-error'>Your offer will be removed. This action cannot be undone.</p>
        <div className='flex gap-4 ml-auto'>
          <button className='btn btn-ghost btn-sm text-lg' onClick={handleModalToggle}>
            Cancel
          </button>
          <button className='btn btn-error btn-outline btn-sm text-lg' onClick={handleRemove}>
            Remove
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PropertyStatusPublished
