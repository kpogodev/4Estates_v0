import { useId } from 'react'
import { motion } from 'framer-motion'
import { formContentChange } from 'utils/animationVariants'
import sale_icon from 'assets/sale-icon.svg'
import rent_icon from 'assets/rent-icon.svg'

const PublishPropertyType = ({ setListingType }) => {
  const key = useId()

  return (
    <motion.div className='w-full flex flex-col items-center gap-10' variants={formContentChange} initial='hidden' animate='visible' exit='exit' key={key}>
      <p className='text-center font-medium text-2xl max-w-[45ch]'>
        Please choose whether you want to <span className='font-bold'>Rent</span> or <span className='font-bold'>Sell</span> your property:
      </p>
      <div className='flex gap-16'>
        <button
          className='flex flex-col w-[150px] gap-2 items-center justify-center cursor-pointer py-2 border-dashed border-2 rounded-md hover:bg-slate-200 transition-colors'
          onClick={setListingType}
          value='rent'
        >
          <img className='block w-16 h-16 pointer-events-none' src={rent_icon} alt='' />
          <span className='label-text text-center font-semibold text-xl pointer-events-none'>Rent</span>
        </button>
        <button
          className='flex flex-col w-[150px] gap-2 items-center cursor-pointer py-4 border-dashed border-2 rounded-md hover:bg-slate-200 transition-colors'
          onClick={setListingType}
          value='sale'
        >
          <img className='block w-16 h-16 pointer-events-none' src={sale_icon} alt='' />
          <span className='label-text text-center font-semibold text-xl pointer-events-none'>Sell</span>
        </button>
      </div>
    </motion.div>
  )
}

export default PublishPropertyType
