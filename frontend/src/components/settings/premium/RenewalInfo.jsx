import moment from 'moment'

function RenewalInfo({ status, date }) {
  if (status === 'ACTIVE') {
    return (
      <p className='text-lg my-5 xl:text-xl'>
        Your subscription will be automatically renewed on <span className='font-semibold'>{moment(date).format('Do MMMM YYYY')}</span> (
        {moment(date).endOf('days').fromNow()})
      </p>
    )
  }

  if (status === 'SUSPENDED') {
    return (
      <p className='text-lg my-5 xl:text-xl'>
        Your subscription is <b>suspended</b> but your Premium Membership is sill active until
        <span className='font-semibold'> {moment(date).format('Do MMMM YYYY')}</span>
      </p>
    )
  }

  if (status === 'CANCELLED') {
    return (
      <p className='text-lg my-5 xl:text-xl'>
        Your subscription has been <b>cancelled</b> and you will not be able to re-subscribe until
        <span className='font-semibold'> {moment(date).format('Do MMMM YYYY')}</span>
      </p>
    )
  }
}

export default RenewalInfo
