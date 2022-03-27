import { motion } from 'framer-motion'
import { MdEditNote } from 'react-icons/md'
import { simpleFadeInOut } from '../../utils/animationVariants'

function NoneEditableActions({ toggleEdit }) {
  return (
    <motion.div className='flex gap-4' variants={simpleFadeInOut} initial='hidden' animate='visible' exit='exit'>
      <button
        type='button'
        className={`btn btn-sm btn-outline btn-primary text-lg capitalize font-semibold flex items-center gap-1`}
        onClick={() => toggleEdit((prevState) => !prevState)}
      >
        <MdEditNote className='w-6 h-6' />
        <span>Edit</span>
      </button>
    </motion.div>
  )
}

export default NoneEditableActions
