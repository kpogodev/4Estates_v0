import { toLocalCurrency } from 'utils/toLocalCurrency'

function InfoWindowContent({ offer: { property, price, _id }, infoWindow, setSelectedMarker }) {
  const handleScrollTo = () => {
    const element = document.querySelector(`[data-offer-id="${_id}"]`) ?? null
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    infoWindow.current.close()
    setSelectedMarker(null)
  }

  return (
    <div className='flex flex-col gap-1 px-2'>
      <p className='font-bold'>{property.location.formatted_address}</p>
      <div className='flex gap-3 items-center leading-tight'>
        <span>
          {property.type.includes('-')
            ? property.type
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join('-')
            : property.type
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
        </span>
        <div className='w-[1px] h-5 bg-gray-400'></div>
        <span className='flex items-center gap-2'>
          <svg className='w-4 h-4 fill-current'>
            <use href='#svg-bed'></use>
          </svg>
          {property.details.bedrooms}
        </span>
        <div className='w-[1px] h-5 bg-gray-400'></div>
        <span className='flex items-center gap-2'>
          <svg className='w-4 h-4 fill-current'>
            <use href='#svg-shower'></use>
          </svg>
          {property.details.bathrooms}
        </span>
      </div>
      <p className='font-medium'>Rent: {toLocalCurrency('en-GB', price, 'GBP')} a month</p>
      <button className='btn btn-link btn-xs w-fit p-0' onClick={handleScrollTo}>
        Find on list
      </button>
    </div>
  )
}

export default InfoWindowContent
