import { useId } from 'react'
import { motion } from 'framer-motion'


function PropertyCardPlaceholder() {
  const placeholderKey = useId()
  return (
    <motion.div
      variants={{
        hidden: {
          scale: 0,
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
      initial='hidden'
      animate='show'
      exit='hidden'
      key={placeholderKey}
      className='relative card md:card-side bg-white shadow-lg rounded-lg lg:rounded-md max-w-5xl animate-pulse'
    >
      <div className='w-full h-[250px] md:h-[270px] md:mb-[76.5px] md:w-[270px] md:min-w-[270px] 2xl:w-[530px] 2xl:min-w-[530px] lg:max-h-[200px] bg-gray-200'></div>
      <div className='relative h-[77px] md:absolute w-full p-3 md:left-0 md:bottom-0 md:border-r md:max-w-[270px] 2xl:max-w-[530px] bg-gray-300'></div>
      <div className='card-body p-3 md:p-4 gap-3'>
        <div className='w-full h-4 bg-gray-200 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200 rounded-md'></div>
        <div className='w-full h-4 bg-gray-200 rounded-md'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded-md'></div>
      </div>
    </motion.div>
  )
}

export default PropertyCardPlaceholder
