import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import AddPropertyForm from 'components/dashboard/properties/add_property/AddPropertyForm'
import { Link } from 'react-router-dom'

function AddProperty() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit' className='container flex flex-col mx-auto py-5 md:py-12 px-3'>
      <div className='w-full max-w-screen-lg flex justify-between items-center py-4 lg:p-8 mx-auto'>
        <h2 className='font-bold text-4xl'>Add Property</h2>
        <Link className='btn btn-link px-0' to='/user'>
          Go back to Dashbaord
        </Link>
      </div>
      <AddPropertyForm />
    </motion.div>
  )
}

export default AddProperty
