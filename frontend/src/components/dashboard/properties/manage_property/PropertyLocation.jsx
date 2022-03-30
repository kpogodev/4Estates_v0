import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EditableActions from '../../../shared/EditableActions'
import NoneEditableActions from '../../../shared/NoneEditableActions'
import GoogleMaps from './GoogleMaps'

function PropertyLocation() {
  const [editable, setEditable] = useState(false)
  const { property } = useSelector((state) => state.properties)

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-end gap-2 items-center pb-2'>
        <h3 className='text-2xl font-semibold mr-auto'>Property Location:</h3>
        {editable ? <EditableActions toggleEdit={setEditable} /> : <NoneEditableActions toggleEdit={setEditable} />}
      </div>
      <GoogleMaps className='w-full h-[400px] shadow-lg' coordinates={property.location.coordinates} />
    </div>
  )
}

export default PropertyLocation
