import moment from 'moment'
import { toLocalCurrency } from 'utils/toLocalCurrency'

function PropertyPublishedRent({ rental }) {
  return (
    <>
      <div className='w-full flex items-center gap-4 justify-between'>
        <span className='badge badge-success badge-lg font-semibold'>Published</span>
        <p className='font-semibold italic text-gray-500'>{moment(rental?.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <div className='w-full flex flex-col items-start py-4'>
        <p>
          Furnished: <span className='font-semibold'>{rental?.furnished ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Monthly Rent: <span className='font-semibold'>{toLocalCurrency('en-GB', rental?.price, 'GBP')}</span>
        </p>
        <p>
          Deposit: <span className='font-semibold'>{toLocalCurrency('en-GB', rental?.deposit, 'GBP')}</span>
        </p>
        <p>
          Contract: <span className='font-semibold'>{`${rental?.rental_type.charAt(0).toUpperCase()}${rental?.rental_type.slice(1)}`} Term</span>
        </p>
        <p>
          Available From: <span className='font-semibold'>{moment(rental?.available_from).format('Do MMM YYYY')}</span>
        </p>
        <p>
          Tenancy Information: <span className='font-semibold'>{rental?.tenancy_info?.blocks.length > 0 ? 'Included' : 'Not Included'}</span>
        </p>
      </div>
    </>
  )
}

export default PropertyPublishedRent
