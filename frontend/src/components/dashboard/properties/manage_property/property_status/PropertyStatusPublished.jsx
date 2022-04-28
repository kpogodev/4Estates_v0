import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as rentsContext from 'context/rents/rentsSlice'
import * as salesContext from 'context/sales/salesSlice'
import { setPropertyIsPublished } from 'context/properties/propertiesSlice'
import PropertyPublishedRent from './PropertyPublishedRent'
import PropertyPublishedSale from './PropertyPublishedSale'
import Modal from 'components/layout/Modal'

function PropertyStatusPublished({ propertyId }) {
  const [modalOpen, setModalOpen] = useState(false)

  const rents = useSelector((state) => state.rents)
  const sales = useSelector((state) => state.sales)

  const dispatch = useDispatch()

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleRemove = () => {
    if (rents.rental) {
      dispatch(rentsContext.removeRental(rents.rental._id))
    }
    if (sales.sale) {
      dispatch(salesContext.removeSale(sales.sale._id))
    }
  }

  useEffect(() => {
    dispatch(rentsContext.getRental(propertyId))
    dispatch(salesContext.getSale(propertyId))

    return () => {
      dispatch(rentsContext.resetRental())
      dispatch(salesContext.resetSale())
    }
  }, [dispatch, propertyId])

  useEffect(() => {
    if (rents.isSuccess && !rents.rental) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
      dispatch(rentsContext.resetSuccess())
    }
  }, [rents.isSuccess, rents.rental, dispatch, handleModalToggle])

  useEffect(() => {
    if (sales.isSuccess && !sales.sale) {
      setModalOpen(false)
      dispatch(setPropertyIsPublished(false))
      dispatch(salesContext.resetSuccess())
    }
  }, [sales.isSuccess, sales.sale, dispatch, handleModalToggle])

  return (
    <div className='w-full'>
      {rents.rental && <PropertyPublishedRent rental={rents.rental} />}
      {sales.sale && <PropertyPublishedSale sale={sales.sale} />}
      <button className='btn btn-error btn-outline btn-sm block ml-auto' onClick={handleModalToggle}>
        Remove Offer
      </button>
      <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='max-w-md flex flex-col gap-5'>
        <h3 className='text-xl xl:text-2xl font-semibold'>Remove Offer</h3>
        <p className='lg:text-lg text-error'>Your offer will be removed. This action cannot be undone.</p>
        <div className='flex gap-4 ml-auto'>
          <button className='btn btn-ghost btn-sm text-lg' onClick={handleModalToggle}>
            Cancel
          </button>
          <button className='btn btn-error btn-outline btn-sm  text-lg' onClick={handleRemove}>
            Remove
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PropertyStatusPublished
