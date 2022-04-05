import { useState } from 'react'
import Modal from '../../../layout/Modal'

const PublishProperty = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div className={className}>
      <button className='btn btn-primary' onClick={handleOpen}>
        Publish Property
      </button>
      <Modal onClose={handleClose} isOpen={isOpen}></Modal>
    </div>
  )
}

export default PublishProperty
