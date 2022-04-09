import { useState } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import RecoveryAccountForm from 'components/auth/RecoveryAccountForm'

function Recover() {
  const [wasSent, setWasSent] = useState(false)
  return (
    <motion.div className='w-full max-w-md mx-auto flex flex-col gap-4' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <h1 className='text-6xl font-bold'>Recover Account</h1>
      {wasSent ? (
        <p className='text-xl mt-2'>Recover link has been sent to you email address, please check your inbox (Link expires after 15 minutes).</p>
      ) : (
        <>
          <p className='text-xl mt-2'>
            To reset your password, enter the email address used to create your account. We'll send you a link which will allow you to create a new password.
          </p>
          <RecoveryAccountForm setWasSent={setWasSent} />
        </>
      )}
    </motion.div>
  )
}

export default Recover
