import { useSelector } from 'react-redux'
import CardHeader from './CardHeader'
import CardPropertyDetails from './CardPropertyDetails'
import CardSwiper from './CardSwiper'
import CardContact from './CardContact'
import CardLikeButton from './CardLikeButton'

function PropertyCard({ data, type }) {
  const { isAuth } = useSelector((state) => state.auth)
  return (
    <div className='relative card md:card-side bg-white shadow-lg rounded-lg lg:rounded-md max-w-5xl'>
      <CardSwiper images={data.property.images} />
      <CardHeader type={type} price={data.price} is_premium={data.publisher.is_premium.active} />
      <div className='card-body p-3 md:p-4 gap-3'>
        <CardPropertyDetails property={data.property} addedOn={data.createdAt} addedBy={data.publisher.name} />
        <CardContact data={data} />
      </div>
      {isAuth && <CardLikeButton />}
    </div>
  )
}

export default PropertyCard
