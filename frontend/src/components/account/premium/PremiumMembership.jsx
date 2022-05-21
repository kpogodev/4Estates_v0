import { useSelector } from 'react-redux'
import Subscribe from '../../shared/Subscribe'
import PremiumStatus from './PremiumStatus'
import { selectUser } from 'redux/auth/authSlice'

function PremiumMembership() {
  const user = useSelector(selectUser)
  return (
    <div className='flex flex-col items-center gap-5'>
      {user.is_premium.active && user.subscription.state !== 'EXPIRED' ? <PremiumStatus /> : <Subscribe />}
    </div>
  )
}

export default PremiumMembership
