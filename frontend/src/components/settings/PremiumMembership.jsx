import InputRadio from 'components/form/InputRadio'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { toLocalCurrency } from 'utils/toLocalCurrency'
import usePayPal from 'hooks/usePayPal'
import { addPremium } from 'context/auth/authSlice'

function PremiumMembership({ unitPrice, discounts }) {
  const { sdkReady } = usePayPal()
  const [subscription, setSubscription] = useState('30d')
  const [plan, setPlan] = useState(unitPrice)

  const dispatch = useDispatch()

  const applyDiscount = useCallback(
    (tier) => {
      return +(unitPrice * tier.units - unitPrice * tier.units * tier.discount).toFixed(2)
    },
    [unitPrice]
  )

  useEffect(() => {
    switch (subscription) {
      case '30d':
        return setPlan(process.env.REACT_APP_PAYPAL_PLAN_30)
      case '90d':
        return setPlan(process.env.REACT_APP_PAYPAL_PLAN_90)
      case '365d':
        return setPlan(process.env.REACT_APP_PAYPAL_PLAN_365)
      default:
        return
    }
  }, [subscription, unitPrice, applyDiscount, discounts.tier_1, discounts.tier_2])

  const onSubscriptionChange = (e) => {
    setSubscription(e.target.value)
  }

  const onSubscriptionApprove = async (_, actions) => {
    const subscriptionResult = await actions.subscription.get()
    const data = {
      subscription_id: subscriptionResult.id,
      status: subscriptionResult.status,
    }
    dispatch(addPremium(data))
  }

  return (
    <div className='flex flex-col items-center gap-5'>
      <h2 className='text-4xl font-bold'>Premium Membership</h2>
      <p className='max-w-[80ch] text-center text-xl'>
        Consider becoming a <b>premium member</b>? You can get a 30 day free trial. You can cancel anytime.
      </p>
      <div className='flex items-center gap-5 py-5'>
        <div className='indicator'>
          <span className='indicator-item indicator-bottom indicator-center badge badge-primary font-semibold'>Free Trial</span>
          <div className='card shadow-md border p-5'>
            <label className='label flex flex-col gap-3 items-center cursor-pointer'>
              <span className='label-text text-center font-semibold text-xl'>30 Days</span>
              <span className='label-text text-center font-semibold text-4xl'>{toLocalCurrency('en-GB', unitPrice, 'GBP')}</span>
              <InputRadio name='subscription' value='30d' handleChange={onSubscriptionChange} checked={subscription === '30d'} />
            </label>
          </div>
        </div>
        <div className='indicator'>
          <span className='indicator-item indicator-bottom indicator-center badge badge-primary font-semibold'>Save {discounts.tier_1.discount * 100}%</span>
          <div className='card shadow-md border p-5'>
            <label className='label flex flex-col gap-3 items-center cursor-pointer'>
              <span className='label-text text-center font-semibold text-xl'>90 Days</span>
              <span className='label-text text-center font-semibold text-4xl'>{toLocalCurrency('en-GB', applyDiscount(discounts.tier_1), 'GBP')}</span>
              <InputRadio name='subscription' value='90d' handleChange={onSubscriptionChange} checked={subscription === '90d'} />
            </label>
          </div>
        </div>
        <div className='indicator'>
          <span className='indicator-item indicator-bottom indicator-center badge badge-primary font-semibold'>Save {discounts.tier_2.discount * 100}%</span>
          <div className='card shadow-md border p-5'>
            <label className='label flex flex-col gap-3 items-center cursor-pointer'>
              <span className='label-text text-center font-semibold text-xl'>365 Days</span>
              <span className='label-text text-center font-semibold text-4xl'>{toLocalCurrency('en-GB', applyDiscount(discounts.tier_2), 'GBP')}</span>
              <InputRadio name='subscription' value='365d' handleChange={onSubscriptionChange} checked={subscription === '365d'} />
            </label>
          </div>
        </div>
      </div>
      <div className='w-full max-w-md'>
        {sdkReady && (
          <PayPalButton
            currency='GBP'
            onApprove={onSubscriptionApprove}
            style={{
              shape: 'pill',
              color: 'blue',
              layout: 'vertical',
              label: 'subscribe',
            }}
            createSubscription={(_, actions) => {
              return actions.subscription.create({
                plan_id: plan,
              })
            }}
          />
        )}
      </div>
    </div>
  )
}

PremiumMembership.defualtsProps = {
  discounts: {
    tier_1: {
      units: 3,
      discount: 0.15,
    },
    tier_2: {
      units: 12,
      discount: 0.25,
    },
  },
}

export default PremiumMembership
