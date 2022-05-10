import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import '@reach/combobox/styles.css'
import usePlacesAutocomplete from 'use-places-autocomplete'
import { updateProperty } from 'context/properties/propertiesSlice'
import SkeletonItem from 'components/shared/SkeletonItem'

function AddressSearch({ editable }, ref) {
  //Redux
  const { property } = useSelector((state) => state.properties)
  const { googleServicesLoaded } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  const [hasBeenEdited, setHasBeenEdited] = useState(false)

  // Places Auto Complete Hook
  const { ready, value, suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'uk',
      },
    },
    defaultValue: property.location.formatted_address,
  })

  useEffect(() => {
    if (!editable) {
      hasBeenEdited && setValue(property.location.formatted_address, false)
    }
  }, [editable, hasBeenEdited, property.location.formatted_address, setValue])

  const onChange = (e) => {
    setValue(e.target.value)
    if (!hasBeenEdited) {
      setHasBeenEdited(true)
    }
  }

  const onSelect = (address) => {
    setValue(address, false)
    clearSuggestions()
  }

  useImperativeHandle(ref, () => ({
    handleSave: () => {
      hasBeenEdited && dispatch(updateProperty({ data: { address: value }, id: property._id }))
      setHasBeenEdited(false)
    },
  }))

  // If connecting to Google API failed
  if (!googleServicesLoaded) return <SkeletonItem className='m-w-[300px] w-full h-[50px] shadow-lg bg-[#ccc] animate-pulse' />

  return (
    <Combobox onSelect={onSelect}>
      <div className='form-control m-w-[300px] w-full'>
        <label className='label'>
          <span className='label-text'>Address:</span>
        </label>
        <ComboboxInput name='address' className='input input-bordered w-full' value={value} onChange={onChange} disabled={!ready || !editable} />
      </div>
      {editable && (
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
      )}
    </Combobox>
  )
}

export default forwardRef(AddressSearch)
