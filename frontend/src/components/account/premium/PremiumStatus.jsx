import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePremium, cancelPremium, resetSuccess, resetError } from 'redux/auth/authSlice'
import { toast } from 'react-toastify'
import diamond_icon from 'assets/diamond-icon.svg'
import StatusBadge from './StatusBadge'
import RenewalInfo from './RenewalInfo'
import Modal from 'components/shared/Modal'

function PremiumStatus() {
  const [modalOpen, setModalOpen] = useState(false)
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  const handleSuspend = () => {
    dispatch(updatePremium('suspend'))
  }

  const handleReactivate = () => {
    dispatch(updatePremium('reactivate'))
  }

  const handleCancel = () => {
    dispatch(cancelPremium())
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(resetSuccess())
    }

    if (isError) {
      toast.error(message)
      dispatch(resetError())
    }
  }, [dispatch, message, isSuccess, isError])

  useEffect(() => {
    if (isSuccess && modalOpen) {
      handleModalToggle()
      dispatch(resetSuccess())
    }
  }, [isSuccess, modalOpen, dispatch, handleModalToggle])

  return (
    <div className='card bg-primary w-full shadow-lg'>
      <div className='card-body items-center text-white text-center'>
        <h2 className='flex items-center gap-2 xl:gap-3 text-2xl lg:text-3xl xl:text-5xl relative'>
          <img className='w-6 h-6 xl:w-10 xl:h-10' src={diamond_icon} alt='' />
          Premium Membership
        </h2>
        <StatusBadge status={user.subscription.status} />
        <RenewalInfo
          status={user.subscription.status}
          date={user.subscription.status !== 'CANCELLED' && user.subscription.status !== 'EXPIRED' ? user.subscription.paid_until : user.is_premium.expires}
        />
        <div className='btn-group'>
          {user.subscription.status === 'EXPIRED' && (
            <button className={`btn btn-success btn-sm lg:btn-md text-white hover:brightness-90${isLoading ? ' loading' : ''}`} onClick={handleReactivate}>
              Renew
            </button>
          )}
          {user.subscription.status === 'ACTIVE' && (
            <button className={`btn btn-accent btn-sm lg:btn-md${isLoading ? ' loading' : ''}`} onClick={handleSuspend}>
              Suspend
            </button>
          )}
          {user.subscription.status === 'SUSPENDED' && (
            <button className={`btn btn-success btn-sm lg:btn-md text-white hover:brightness-90${isLoading ? ' loading' : ''}`} onClick={handleReactivate}>
              Activate
            </button>
          )}
          {user.subscription.status !== 'CANCELLED' && (
            <>
              <button className={`btn btn-error hover:brightness-90 text-white btn-sm lg:btn-md${isLoading ? ' loading' : ''}`} onClick={handleModalToggle}>
                Cancel
              </button>
              <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='max-w-md flex flex-col gap-5'>
                <h3 className='text-xl xl:text-2xl font-semibold'>Cancel Subscription</h3>
                <p className='lg:text-xl'>
                  Your subscription will be <b>cancelled</b>. This action cannot be undone and you will need to wait until your current Premium Membership
                  expires in order to re-subscribe again. <b>Are you sure you want to cancel your subscription?</b>
                </p>
                <div className='flex gap-4 ml-auto'>
                  <button className='btn btn-ghost btn-sm text-lg' onClick={handleModalToggle}>
                    No, go back
                  </button>
                  <button className='btn btn-error btn-outline btn-sm text-lg' onClick={handleCancel}>
                    Yes, Cancel
                  </button>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PremiumStatus
