import Subscribe from './Subscribe'
import PremiumStatus from './PremiumStatus'

function PremiumMembership() {
  return (
    <div className='flex flex-col items-center gap-5'>
      <PremiumStatus />
      <Subscribe />
    </div>
  )
}

export default PremiumMembership
