import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getRental,
  removeRental,
  selectRental,
  selectRentsIsError,
  selectRentsIsSuccess,
  resetError,
  resetSuccess,
} from 'context/rents/rentsSlice'
import * as salesContext from 'context/sales/salesSlice'
import { setPropertyIsPublished } from 'context/properties/propertiesSlice'
import PropertyPublishedRent from './PropertyPublishedRent'
import PropertyPublishedSale from './PropertyPublishedSale'
import Modal from 'components/layout/Modal'
import { MdDeleteForever } from 'react-icons/md'

function PropertyStatusPublished({ propertyId }) {
  const [modalOpen, setModalOpen] = useState(false)

  const rental = useSelector(selectRental)
  const rentsIsSuccess = useSelector(selectRentsIsSuccess)
  const rentsIsError = useSelector(selectRentsIsError)

  const sales = useSelector((state) => state.sales)

  const dispatch = useDispatch()

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleRemove = () => {
    rental && dispatch(removeRental(rental._id))

    if (sales.sale) {
      dispatch(salesContext.removeSale(sales.sale._id))
    }
  }

  useEffect(() => {
    dispatch(getRental(propertyId))
    dispatch(salesContext.getSale(propertyId))
  }, [dispatch, propertyId])

  useEffect(() => {
    if (rentsIsSuccess && !rental) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
    }
  }, [rentsIsSuccess, rental, dispatch, handleModalToggle])

  useEffect(() => {
    if (sales.isSuccess && !sales.sale) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
    }
  }, [sales.isSuccess, sales.sale, dispatch, handleModalToggle])

  useEffect(() => {
    if (rentsIsSuccess) dispatch(resetSuccess())
    if (sales.isSuccess) dispatch(salesContext.resetSuccess())
    if (rentsIsError) dispatch(resetError())
    if (sales.isError) dispatch(salesContext.resetError())
  }, [dispatch, rentsIsSuccess, sales.isSuccess, rentsIsError, sales.isError])

  return (
    <div className='w-full'>
      {rental && <PropertyPublishedRent rental={rental} />}
      {sales.sale && <PropertyPublishedSale sale={sales.sale} />}
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
