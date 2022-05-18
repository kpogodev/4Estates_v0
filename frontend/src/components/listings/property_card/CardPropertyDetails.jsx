import moment from 'moment'
import 'moment/locale/en-gb'

function CardPropertyDetails({ property, addedOn, addedBy }) {
  return (
    <div className='w-full flex flex-col items-start gap-1'>
      <p className='text-xl font-semibold'>{property.location.formatted_address}</p>
      <div className='flex gap-3 items-center text-lg leading-tight'>
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
      <p className='hidden md:line-clamp-3 md:w-full mt-3'>{property.details.description}</p>
      <p className='text-sm text-gray-500 font-medium mt-3'>
        Added on {moment(addedOn).locale('en-gb').format('L')} by {addedBy}
      </p>
    </div>
  )
}

export default CardPropertyDetails
