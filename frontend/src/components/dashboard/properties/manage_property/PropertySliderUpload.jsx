import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFileUploader from '../../../../hooks/useFileUploader'
import DropBoxDefaultContent from './DropBoxDefaultContent'
import DropBoxPreviewContent from './DropBoxPreviewContent'
import { uploadPropertyImages } from '../../../../features/properties/propertiesSlice'
import DropBoxProgress from './DropBoxProgress'
import { MdUpload } from 'react-icons/md'

function PropertySliderUpload({ className, isLoading, uploadProgress }) {
  const dispatch = useDispatch()
  const params = useParams()

  const { files, handleChange, handleSubmit } = useFileUploader({
    onSubmit: (data) => {
      dispatch(uploadPropertyImages({ data, id: params.id }))
    },
  })

  return (
    <form className={`${className} relative`} onSubmit={handleSubmit}>
      <label className=' relative mt-1 h-full flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-slate-100 transition-colors '>
        <span className='sr-only'>Upload a photo</span>
        <input
          type='file'
          onChange={handleChange}
          className='block absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
          multiple
        />
        {files.length > 0 && <DropBoxPreviewContent filesData={files} />}
        {files.length === 0 && !isLoading && <DropBoxDefaultContent />}
        {isLoading && <DropBoxProgress progress={uploadProgress} />}
      </label>
      {files.length > 0 && (
        <button
          type='submit'
          className='btn btn-sm btn-circle btn-primary absolute !left-1/2 !bottom-2 !-translate-x-1/2 text-xl'
        >
          <MdUpload />
        </button>
      )}
    </form>
  )
}

export default PropertySliderUpload
