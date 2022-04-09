import EditableActions from 'components/shared/EditableActions'
import NoneEditableActions from 'components/shared/NoneEditableActions'

function ProfileFormActions({ editable, toggleEdit }) {
  return (
    <div className='flex justify-end gap-2 items-center'>
      <p className='text-xl font-semibold mr-auto'>Your Details:</p>
      {editable ? <EditableActions toggleEdit={toggleEdit} /> : <NoneEditableActions toggleEdit={toggleEdit} />}
    </div>
  )
}

export default ProfileFormActions
