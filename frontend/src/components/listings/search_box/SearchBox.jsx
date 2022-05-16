import { useState, useCallback } from 'react'
import LocationInput from './LocationInput'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSelector } from 'react-redux'
import RadiusInput from './RadiusInput'
import PropertyTypeInput from './PropertyTypeInput'
import BedroomInput from './BedroomInputs'
import PriceInputs from './PriceInputs'
import Results from './Results'
import Accordion from 'components/shared/Accordion'

const DekstopContent = () => (
  <>
    <div className='flex gap-4'>
      <RadiusInput />
      <PropertyTypeInput />
    </div>
    <BedroomInput />
    <PriceInputs />
  </>
)

const MobileContent = () => (
  <>
    <div className='flex gap-4 flex-wrap justify-center'>
      <RadiusInput />
      <PropertyTypeInput />
      <BedroomInput />
      <PriceInputs />
    </div>
  </>
)

function SearchBox() {
  const [accordionOpened, setAccordionOpened] = useState(false)
  const { googleServicesLoaded } = useSelector((state) => state.app)
  const { matches } = useMediaQuery('(min-width: 1024px)')

  const handleOpenAccordion = useCallback(() => {
    setAccordionOpened((prev) => !prev)
  }, [])

  return (
    <div className='col-span-1 flex flex-col gap-5 p-4 md:p-6 rounded-md bg-accent shadow-custom sticky'>
      <h2 className='hidden lg:block text-2xl text-left'>Narrow your search results with some filters</h2>
      <div className='flex flex-col justify-start gap-3'>
        {googleServicesLoaded && <LocationInput />}
        {!matches && (
          <button className='btn btn-primary' onClick={handleOpenAccordion}>
            Show More Filters
          </button>
        )}
        {matches ? <DekstopContent /> : <Accordion isOpen={accordionOpened}>{<MobileContent />}</Accordion>}
      </div>
      <Results />
    </div>
  )
}

export default SearchBox
