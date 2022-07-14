import { useId } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import PublishPropertyForm from 'components/dashboard/properties/manage_property/publish_property/PublishPropertyForm'

function PublishProperty() {
  const keyId = useId()
  return (
    <motion.div
      className='container flex flex-col mx-auto py-5 md:py-12 px-3'
      key={keyId}
      variants={pageTransition}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <PublishPropertyForm />
    </motion.div>
  )
}

export default PublishProperty
