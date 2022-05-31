import { useId } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import PublishPropertyForm from 'components/dashboard/properties/manage_property/publish_property/PublishPropertyForm'

function PublishProperty() {
  const keyId = useId()
  return (
    <motion.div key={keyId} variants={pageTransition} initial='hidden' animate='visible' exit='exit' className='px-3'>
      <PublishPropertyForm />
    </motion.div>
  )
}

export default PublishProperty
