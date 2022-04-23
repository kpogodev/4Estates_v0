import { useId } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import PublishPropertyForm from 'components/dashboard/properties/publish_property/PublishPropertyForm'

function PublishProperty() {
  const keyId = useId()
  return (
    <motion.div key={keyId} variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <PublishPropertyForm />
    </motion.div>
  )
}

export default PublishProperty
