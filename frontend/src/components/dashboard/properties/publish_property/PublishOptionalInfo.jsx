import { useId } from 'react'
import RichTextEditor from 'components/shared/RichTextEditor'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'

function PublishOptionalInfo({ formData, onChange }) {
  const keyId = useId()
  return (
    <motion.div
      className='max-w-2xl w-full flex flex-col items-center gap-8'
      variants={formContentChange}
      initial='hidden'
      animate='visible'
      exit='exit'
      key={keyId}
    >
      <p className='text-center font-medium text-2xl max-w-[45ch]'>Tenancy Information (Optional)</p>
      <RichTextEditor className='w-full py-2 px-4 rounded border-2' intialData={formData.tenancy_info} onChange={onChange} />
    </motion.div>
  )
}

export default PublishOptionalInfo
