import { useState } from 'react'
import Modal from 'components/layout/Modal'
import PublishPropertyForm from './PublishPropertyForm'

const PublishProperty = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div className={className}>
      <button className='btn btn-primary' onClick={handleOpen}>
        Publish Property
      </button>
      <Modal onClose={handleClose} isOpen={isOpen} boxStyle='!max-w-5xl p-12'>
        <PublishPropertyForm />
      </Modal>
    </div>
  )
}

export default PublishProperty
