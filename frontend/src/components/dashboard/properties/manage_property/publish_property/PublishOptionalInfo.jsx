import { useId } from 'react'
import RichTextEditor from 'components/common/RichTextEditor'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import document_icon from 'assets/document-icon.svg'

function PublishOptionalInfo({ initialData, stateName, onChange, title }) {
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
      <p className='text-center font-medium text-2xl max-w-[45ch]'>{title}</p>
      <img className='block w-16 h-16 pointer-events-none' src={document_icon} alt='' />
      <RichTextEditor className='w-full py-2 px-4 rounded border-2' initialData={initialData} onChange={onChange} stateName={stateName} />
    </motion.div>
  )
}

export default PublishOptionalInfo
