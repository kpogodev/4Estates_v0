import PropertyCard from 'components/listings/property_card/PropertyCard'

function RentsList({ rents }) {
  return (
    <div className='w-full flex flex-col items-stretch gap-7'>
      {rents.map((rent) => (
        <PropertyCard key={rent._id} data={rent} type='rent' />
      ))}
    </div>
  )
}

export default RentsList
