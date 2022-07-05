import { useDispatch, useSelector } from 'react-redux'
import { selectProfileObservedRents, selectProfileIsLoading, addObservedRent, removeObservedRent } from 'redux/profiles/profilesSlice'
import Spinner from 'components/common/Spinner'

function CardLikeButton({ offer_id }) {
  const observedRents = useSelector(selectProfileObservedRents)
  const isLoading = useSelector(selectProfileIsLoading)
  const isObserved = observedRents.includes(offer_id)

  const dispatch = useDispatch()

  const handleClick = () => (isObserved ? dispatch(removeObservedRent(offer_id)) : dispatch(addObservedRent(offer_id)))

  return (
    <button
      className={`ml-auto text-gray-500 hover:text-rose-500 transition-colors z-10 ${isObserved ? 'text-rose-700' : 'text-gray-500'}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <Spinner className='w-5 h-5' />
      ) : (
        <svg className='w-5 h-5 fill-current'>
          <use href='#svg-heart' />
        </svg>
      )}
    </button>
  )
}

export default CardLikeButton



