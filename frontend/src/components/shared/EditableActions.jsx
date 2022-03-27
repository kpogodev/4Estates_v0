import { MdCancel, MdOutlineDone } from 'react-icons/md'
import { motion } from 'framer-motion'
import { simpleFadeInOut } from '../../utils/animationVariants'

function EditableActions({ toggleEdit }) {
  return (
    <motion.div className='flex gap-4' variants={simpleFadeInOut} initial='hidden' animate='visible' exit='exit'>
      <button
        type='button'
        className={`btn btn-sm btn-outline btn-error text-lg capitalize font-semibold flex items-center gap-1`}
        onClick={() => toggleEdit((prevState) => !prevState)}
      >
        <MdCancel />
        <span>Cancel</span>
      </button>
      <button
        className='btn btn-sm btn-outline btn-success text-lg capitalize font-semibold flex items-center gap-1'
        type='submit'
      >
        <MdOutlineDone />
        <span>Save</span>
      </button>
    </motion.div>
  )
}

export default EditableActions
