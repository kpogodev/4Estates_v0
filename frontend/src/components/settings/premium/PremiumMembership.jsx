import { useSelector, useDispatch } from 'react-redux'
import Subscribe from '../../shared/Subscribe'
import PremiumStatus from './PremiumStatus'

function PremiumMembership() {
  const { user } = useSelector((state) => state.auth)
  return <div className='flex flex-col items-center gap-5'>{user.is_premium.active ? <PremiumStatus /> : <Subscribe />}</div>
}

export default PremiumMembership
