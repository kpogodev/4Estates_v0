import { MdCancel, MdOutlineDone } from 'react-icons/md'
import { motion } from 'framer-motion'
import { simpleFadeInOut } from 'utils/animationVariants'
import PropTypes from 'prop-types'

function EditableActions({ toggleEdit, onSave }) {
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
        onClick={onSave}
      >
        <MdOutlineDone />
        <span>Save</span>
      </button>
    </motion.div>
  )
}

EditableActions.defaults = {
  onSave: () => {},
}

EditableActions.propTypes = {
  toggleEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func,
}

export default EditableActions
