import { MdCancel, MdOutlineDone } from 'react-icons/md'
import { motion } from 'framer-motion'
import { simpleFadeInOut } from 'utils/animationVariants'
import PropTypes from 'prop-types'

function EditableActions({ toggleEdit, onSave, onCancel, notSubmit }) {
  const handleCancel = () => {
    toggleEdit((prevState) => !prevState)
    onCancel()
  }

  return (
    <motion.div className='flex gap-4' variants={simpleFadeInOut} initial='hidden' animate='visible' exit='exit'>
      <button type='button' className={`btn btn-sm btn-outline btn-error text-lg capitalize font-semibold flex items-center gap-1`} onClick={handleCancel}>
        <MdCancel />
        <span>Cancel</span>
      </button>
      <button
        className='btn btn-sm btn-outline btn-success text-lg capitalize font-semibold flex items-center gap-1'
        type={notSubmit ? 'button' : 'submit'}
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
  onCancle: () => {},
  notSubmit: false,
}

EditableActions.propTypes = {
  toggleEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  notSubmit: PropTypes.bool,
}

export default EditableActions
