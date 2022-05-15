import LocationInput from './LocationInput'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RadiusInput from './RadiusInput'
import PropertyTypeInput from './PropertyTypeInput'
import BedroomInput from './BedroomInputs'
import PriceInputs from './PriceInputs'
import Results from './Results'

function SearchBox() {
  const { googleServicesLoaded } = useSelector((state) => state.app)

  return (
    <div className='col-span-1 flex flex-col gap-5 p-6 rounded-md bg-accent shadow-custom sticky'>
      <h2 className='text-2xl text-left'>Narrow your search results with some filters</h2>
      <div className='flex flex-col justify-start gap-3'>
        {googleServicesLoaded && <LocationInput />}
        <div className='flex gap-4'>
          <RadiusInput />
          <PropertyTypeInput />
        </div>
        <BedroomInput />
        <PriceInputs />
      </div>
      <Results />
    </div>
  )
}

export default SearchBox
