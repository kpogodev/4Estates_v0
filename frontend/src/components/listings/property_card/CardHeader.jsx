import React from 'react'
import { toLocalCurrency } from 'utils/toLocalCurrency'

const CardHeader = ({ type, price, is_premium }) => {
  const variableStyleBackground = is_premium ? 'bg-primary border-secondary' : 'bg-gray-100 border-gray-200'
  const variableStyleColorPricePrimary = is_premium ? 'text-white' : 'text-gray-700'
  const variableStyleColorPriceSecondary = is_premium ? 'text-gray-100' : 'text-gray-600'

  return (
    <div
      className={`relative md:absolute  w-full p-3 flex flex-col items-start md:left-0 md:bottom-0 md:border-r md:max-w-[270px] lg:max-w-[530px] ${variableStyleBackground}`}
    >
      {type === 'rent' ? (
        <>
          <span className={`text-2xl font-semibold leading-tight ${variableStyleColorPricePrimary}`}>{toLocalCurrency('en-GB', price, 'GBP')} pcm</span>
          <span className={`text-lg font-medium leading-tight ${variableStyleColorPriceSecondary}`}>
            {toLocalCurrency('en-GB', Math.floor((price * 12) / 52), 'GBP')} pw
          </span>
        </>
      ) : (
        <span className={`text-2xl font-semibold leading-tight ${variableStyleColorPricePrimary}`}>{toLocalCurrency('en-GB', price, 'GBP')}</span>
      )}
      {is_premium && (
        <span className='absolute right-0 top-0 w-20 h-full p-2 flex items-center font-semibold text-white uppercase text-center text-sm leading-tight bg-[rgba(0,0,0,0.1)]'>
          Premium Listing
        </span>
      )}
    </div>
  )
}

export default CardHeader
