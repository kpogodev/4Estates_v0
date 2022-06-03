import { useSearchParams } from 'react-router-dom'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import { IoCloseCircleSharp } from 'react-icons/io5'
import SkeletonItem from 'components/shared/SkeletonItem'
import '@reach/combobox/styles.css'

function LocationInput() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Places Auto Complete Hook
  const { ready, value, suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'uk',
      },
    },
    defaultValue: searchParams.get('location') ?? '',
  })

  const onAddressSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({
      address,
      componentRestrictions: {
        country: 'uk',
      },
    })

    const { lat, lng } = await getLatLng(results[0])
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), lat, lng, location: address })
  }

  const resetLocation = () => {
    let current = Object.fromEntries(searchParams.entries())
    delete current.location && delete current.lat && delete current.lng && delete current.radius
    setSearchParams(current)
    setValue('', false)
  }

  // If connecting to Google API failed
  if (!ready) return <SkeletonItem className='w-[200px] h-[50px] shadow-lg bg-[#ccc] animate-pulse' />

  return (
    <div className='form-control sm:w-[250px]'>
      <label className='label py-0 text-sm'>Location:</label>
      <Combobox className='relative' onSelect={onAddressSelect}>
        <ComboboxInput
          name='address'
          className='input input-sm input-bordered w-full text-gray-900 font-semibold'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='e.g. London, UK...'
          autoComplete='off'
        />
        {value.length > 0 && (
          <button className='absolute top-1/2 right-2 -translate-y-1/2' onClick={resetLocation}>
            <IoCloseCircleSharp className='text-2xl text-gray-500 hover:text-error transition-colors' />
          </button>
        )}
        <ComboboxPopover className='z-50'>
          <ComboboxList className='text-2xl'>
            {suggestions.status === 'OK' &&
              suggestions.data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description}>
                  <ComboboxOptionText />
                </ComboboxOption>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default LocationInput
