import moment from 'moment'
import { toLocalCurrency } from 'utils/toLocalCurrency'

function PropertyPublishedSale({ sale }) {

  return (
    <>
      <div className='w-full flex items-center gap-4 justify-between'>
        <span className='badge badge-success badge-lg font-semibold'>Published</span>
        <p className='font-semibold italic text-gray-500'>{moment(sale?.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <div className='w-full flex flex-col items-start py-4'>
        <p>
          Price: <span className='font-semibold'>{toLocalCurrency('en-GB', sale?.price, 'GBP')}</span>
        </p>
        <p>
          Additional Information: <span className='font-semibold'>{sale?.additional_info?.blocks.length > 0 ? 'Included' : 'Not Included'}</span>
        </p>
      </div>
    </>
  )
}

export default PropertyPublishedSale
