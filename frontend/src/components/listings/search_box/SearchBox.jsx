import { useState, useCallback } from 'react'
import LocationInput from './LocationInput'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSelector } from 'react-redux'
import RadiusInput from './RadiusInput'
import PropertyTypeInput from './PropertyTypeInput'
import BedroomInput from './BedroomInputs'
import PriceInputs from './PriceInputs'
import Accordion from 'components/common/Accordion'

function SearchBox() {
  const [accordionOpened, setAccordionOpened] = useState(false)
  const { googleServicesLoaded } = useSelector((state) => state.app)
  const { matches } = useMediaQuery('(min-width: 1024px)')

  const handleOpenAccordion = useCallback(() => {
    setAccordionOpened((prev) => !prev)
  }, [])

  const DekstopContent = () => (
    <>
      <RadiusInput />
      <PropertyTypeInput />
      <BedroomInput />
      <PriceInputs />
    </>
  )

  const MobileContent = () => (
    <div className='flex gap-4 flex-wrap justify-center'>
      <RadiusInput />
      <PropertyTypeInput />
      <BedroomInput />
      <PriceInputs />
    </div>
  )

  return (
    <div className='flex flex-col gap-5 p-2 pb-4 lg:pt-3 lg:p-6 bg-secondary text-secondary-content sticky top-0 left-0 z-50 shadow-lg' data-sticky-bar>
      <div className='flex flex-col justify-start gap-3'>
        <div className='flex flex-col sm:flex-row sm:justify-center sm:items-end gap-2'>
          {googleServicesLoaded && <LocationInput />}
          {matches && <DekstopContent />}
          {!matches && (
            <>
              <button className='btn btn-accent btn-sm' onClick={handleOpenAccordion}>
                {accordionOpened ? 'Hide filters' : 'More filters'}
              </button>
            </>
          )}
        </div>
        {!matches && <Accordion isOpen={accordionOpened}>{<MobileContent />}</Accordion>}
      </div>
    </div>
  )
}

export default SearchBox
