import EditableActions from 'components/common/EditableActions'
import NoneEditableActions from 'components/common/NoneEditableActions'

function ProfileFormActions({ editable, toggleEdit, onCancel }) {
  return (
    <div className='flex justify-end gap-2 items-center'>
      <p className='text-xl font-semibold mr-auto'>Your Details:</p>
      {editable ? <EditableActions toggleEdit={toggleEdit} onCancel={onCancel} /> : <NoneEditableActions toggleEdit={toggleEdit} />}
    </div>
  )
}

export default ProfileFormActions
