import { useState } from 'react'
import { MdUpload, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { uploadAvatar } from '../../../features/auth/authSlice'
import Spinner from '../../shared/Spinner'

function UserAvatar({ user: { name, avatar }, loading }) {
  const [file, setFile] = useState(null)
  const [preview, setPreivew] = useState(null)

  const dispatch = useDispatch()

  const onFileChange = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setFile(reader.result)
      setPreivew(reader.result)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(uploadAvatar(file))
    setFile(null)
    setPreivew(null)
  }

  const avatarImage = (
    <img
      className={`w-24 h-24 object-cover rounded-full border-4 bg-black border-white shadow-md ${
        preview && 'brightness-[0.8]'
      } backface-hidden`}
      src={preview ? preview : avatar.secure_url}
      alt={name}
    />
  )

  const avatarPlaceholder = (
    <span className='grid place-items-center w-24 h-24 font-bold text-accent text-4xl rounded-full border-4 border-accent shadow-md'>
      {name?.charAt(0)?.toUpperCase()}
    </span>
  )

  const previewBagde = (
    <div class='badge badge-accent absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 font-medium z-10'>Preview</div>
  )

  return (
    <div className='relative'>
      {preview && previewBagde}
      {!loading ? (
        avatar?.secure_url || preview ? (
          avatarImage
        ) : (
          avatarPlaceholder
        )
      ) : (
        <Spinner className='w-24 h-24 object-cover bg-secondary p-4 rounded-full border-4 border-white shadow-md' />
      )}
      <form onSubmit={onSubmit}>
        <label className='btn btn-sm w-[32px] h-[32px] p-0 btn-accent rounded-full absolute bottom-0 right-0 shadow-md'>
          <MdEdit className='w-5 h-5' />
          <input type='file' onChange={onFileChange} className='hidden' />
          <button
            className={`btn btn-sm w-[32px] h-[32px] p-0 btn-primary rounded-full absolute bottom-0 right-0 shadow-md ${
              !preview && 'hidden'
            }`}
          >
            <MdUpload className='w-5 h-5' />
          </button>
        </label>
      </form>
    </div>
  )
}

export default UserAvatar
