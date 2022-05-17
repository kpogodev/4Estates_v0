import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, createSearchParams } from 'react-router-dom'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import SkeletonItem from 'components/shared/SkeletonItem'
import '@reach/combobox/styles.css'
import { nanoid } from '@reduxjs/toolkit'

const radiusOptions = [0.25, 0.5, 1, 2, 3, 5, 10, 15, 20, 25]

function SearchBar() {
  const [params, setParams] = useState({
    radius: 2,
  })

  const navigate = useNavigate()

  // Places Auto Complete Hook
  const { ready, value, suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ['uk'],
      },
    },
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
    setParams((prev) => ({ ...prev, lat, lng, location: address }))
  }

  const onRadiusSelect = (e) => {
    setParams((prev) => ({ ...prev, radius: e.target.value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (!params.lat || !params.lng) {
      return toast.error('Please select a location')
    }

    switch (e.nativeEvent.submitter.name) {
      case 'rent':
        return navigate({
          pathname: '/rent',
          search: createSearchParams(params).toString(),
        })
      case 'buy':
        return navigate({
          pathname: '/buy',
          search: createSearchParams(params).toString(),
        })
      default:
        break
    }
  }

  // If connecting to Google API failed
  if (!ready) return <SkeletonItem className='w-full h-[50px] shadow-lg bg-[#ccc] animate-pulse' />

  return (
    <form className='flex flex-row gap-2 w-full items-end' onSubmit={handleSearch}>
      <div className='form-control flex-grow'>
        <label className='label py-0'>Location:</label>
        <Combobox onSelect={onAddressSelect}>
          <ComboboxInput
            name='address'
            className='input input-bordered w-full text-gray-900'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='London, UK...'
            autoComplete='off'
          />
          <ComboboxPopover>
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
      <div className='form-control flex-grow-0'>
        <label className='label py-0'>Radius:</label>
        <select name='radius' className={`select select-bordered text-black`} value={params.radius} onChange={onRadiusSelect}>
          {radiusOptions.map((option) => (
            <option key={nanoid()} value={option}>
              {`${option} ${option <= 1 ? 'mile' : 'miles'}`}
            </option>
          ))}
        </select>
      </div>
      <button type='submit' className='btn btn-secondary text-xl flex-grow-0' name='rent'>
        Rent
      </button>
      <button type='submit' className='btn btn-secondary text-xl flex-grow-0' name='buy'>
        Buy
      </button>
    </form>
  )
}

export default SearchBar
