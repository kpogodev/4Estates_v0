import { motion } from 'framer-motion'
import { simpleFadeInOut } from 'utils/animationVariants'
import { nanoid } from '@reduxjs/toolkit'

function DropBoxPreviewContent({ filesData }) {
  return (
    <motion.div variants={simpleFadeInOut} initial='hidden' animate='visible' exit='exit'>
      <div className='grid grid-cols-5 gap-2'>
        {filesData.map(
          (data, index) => index <= 3 && <img key={nanoid()} src={data} className='block w-full aspect-square object-cover shadow-sm rounded-md' alt='' />
        )}
        {filesData.length > 4 && (
          <div className='flex justify-center items-center w-full aspect-square object-cover shadow-sm rounded-md bg-gray-200'>
            <span className='text-gray-400 text-4xl font-bold'>+{filesData.length - 4}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default DropBoxPreviewContent
