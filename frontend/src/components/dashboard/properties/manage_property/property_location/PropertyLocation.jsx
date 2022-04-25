import { useState, useRef } from 'react'
import EditableActions from 'components/shared/EditableActions'
import NoneEditableActions from 'components/shared/NoneEditableActions'
import AddressSearch from './AddressSearch'
import PropertyMap from './PropertyMap'

function PropertyLocation() {
  console.count('Location section render:')
  const [editable, setEditable] = useState(false)

  const refAddressSearch = useRef()
  const refGoogleMaps = useRef()

  const onSave = () => {
    refAddressSearch.current.handleSave()
    refGoogleMaps.current.handleSave()
    setEditable(false)
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-end gap-2 items-center pb-2'>
        <h3 className='text-xl xl:text-2xl font-semibold mr-auto'>Property Location</h3>
        {editable ? (
          <EditableActions toggleEdit={setEditable} onSave={onSave} />
        ) : (
          <NoneEditableActions toggleEdit={setEditable} />
        )}
      </div>
      <AddressSearch ref={refAddressSearch} editable={editable} />
      <PropertyMap ref={refGoogleMaps} editable={editable} />
    </div>
  )
}

export default PropertyLocation
