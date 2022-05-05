import PremiumMembership from 'components/settings/PremiumMembership'

function Settings() {
  return (
    <div className=''>
      <PremiumMembership
        unitPrice={19.99}
        discounts={{
          tier_1: {
            units: 3,
            discount: 0.15,
          },
          tier_2: {
            units: 12,
            discount: 0.25,
          },
        }}
      />
    </div>
  )
}

export default Settings
