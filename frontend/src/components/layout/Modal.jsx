import { useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { LayoutGroup, motion } from 'framer-motion'

const Modal = ({ children, isOpen, onClose, boxStyle }) => {
  const onClickOut = (e) => !e.target.closest('.modal-box') && onClose()

  const onEscDown = useCallback((e) => e.key === 'Escape' && onClose(), [onClose])

  // Close on outside click
  useEffect(() => {
    document.addEventListener('keydown', onEscDown)

    return () => {
      document.removeEventListener('keydown', onEscDown)
    }
  }, [onEscDown])

  useEffect(
    (e) => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    },
    [isOpen]
  )

  return ReactDOM.createPortal(
    <div className={`modal modal-bottom sm:modal-middle ${isOpen ? 'visible pointer-events-auto opacity-100' : ''}`} onClick={onClickOut}>
      <LayoutGroup>
        <motion.div className={`modal-box relative w-full ${boxStyle} !rounded-none block`} layout>
          <motion.button className='btn btn-sm btn-secondary btn-circle absolute right-2 top-2' onClick={onClose} layout={true}>
            ✕
          </motion.button>
          {children}
        </motion.div>
      </LayoutGroup>
    </div>,
    document.getElementById('portal')
  )
}

Modal.defaultProps = {
  boxStyle: '!max-w-6xl p-10',
}

export default Modal
