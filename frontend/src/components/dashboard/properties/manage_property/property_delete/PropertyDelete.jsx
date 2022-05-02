import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdWarning, MdDeleteForever } from 'react-icons/md'
import Modal from 'components/layout/Modal'
import { deleteProperty } from 'context/properties/propertiesSlice'

function PropertyDelete({ propertyId }) {
  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isSuccess, property } = useSelector((state) => state.properties)

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleRemove = () => {
    dispatch(deleteProperty(propertyId))
  }

  useEffect(() => {
    if (isSuccess && !property) {
      navigate('/dashboard')
    }
  }, [isSuccess, property, navigate])

  return (
    <div className='flex items-center justify-between gap-x-10 gap-y-4 p-5 lg:p-8 border-gray-300 border-2 border-dashed rounded-md flex-wrap'>
      <h3 className='flex items-center gap-2 text-xl xl:text-2xl font-semibold mr-auto'>
        <MdWarning className='text-error' />
        Delete Property
      </h3>
      <button className='btn btn-error btn-outline btn-sm text-lg capitalize font-semibold flex items-center gap-1' onClick={handleModalToggle}>
        <MdDeleteForever className='w-6 h-6' />
        <span>Delete Property</span>
      </button>
      <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='max-w-md flex flex-col gap-5'>
        <h3 className='text-xl xl:text-2xl font-semibold'>Delete Property</h3>
        <p className='lg:text-lg text-error font-semibold'>
          Your property will be removed permanently. This action cannot be undone. Do you still want to proceed?
        </p>
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

export default PropertyDelete
