import { MdEditNote, MdCancel, MdOutlineDone } from 'react-icons/md';

function ProfileFormActions({ editable, toggleEdit }) {
  return (
    <div className='flex justify-end gap-2 items-center'>
      <p className='text-xl font-semibold mr-auto'>Your Details:</p>
      {editable ? (
        <>
          <button
            type='button'
            className={`btn btn-sm btn-outline btn-error text-lg capitalize font-semibold flex items-center gap-1`}
            onClick={() => toggleEdit((prevState) => !prevState)}
          >
            <MdCancel />
            <span>Cancel</span>
          </button>
          <button className='btn btn-sm btn-outline btn-success text-lg capitalize font-semibold flex items-center gap-1'>
            <MdOutlineDone />
            <span>Save</span>
          </button>
        </>
      ) : (
        <>
          <button
            type='button'
            className={`btn btn-sm btn-outline btn-primary text-lg capitalize font-semibold flex items-center gap-1`}
            onClick={() => toggleEdit((prevState) => !prevState)}
          >
            <MdEditNote className='w-6 h-6' />
            <span>Edit</span>
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileFormActions;
