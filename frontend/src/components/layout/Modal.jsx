import { useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children, isOpen, onClose }) => {
  const onClickOut = (e) => !e.target.closest('.modal-box') && onClose()

  const onEscDown = useCallback((e) => e.key === 'Escape' && onClose(), [onClose])

  // Close on outside click
  useEffect(() => {
    document.addEventListener('keydown', onEscDown)

    return () => {
      document.removeEventListener('keydown', onEscDown)
    }
  }, [onEscDown])

  return ReactDOM.createPortal(
    <>
      <div
        className={`modal modal-bottom sm:modal-middle ${isOpen ? 'visible pointer-events-auto opacity-100' : ''}`}
        onClick={onClickOut}
      >
        <div className='modal-box relative w-full !max-w-7xl py-12 px-4'>
          <button className='btn btn-sm btn-circle absolute right-2 top-2' onClick={onClose}>
            ✕
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
