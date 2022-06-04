import { useId } from 'react'
import { motion } from 'framer-motion'

function ListingMapPlaceholder() {
  const placeholderKey = useId()
  return (
    <motion.div
      key={placeholderKey}
      className='col-span-3 aspect-w-4 aspect-h-3 md:aspect-w-6 md:aspect-h-2 bg-gray-300 animate-pulse'
      variants={{
        hidden: {
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        },
        show: {
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
      initial='hidden'
      animate='show'
      exit='hidden'
    >
      <div className='grid place-items-center'>
        <svg className='block fill-[#eee] !w-[200px] !h-[200px]'>
          <use href='#svg-google-maps' />
        </svg>
      </div>
    </motion.div>
  )
}

export default ListingMapPlaceholder
