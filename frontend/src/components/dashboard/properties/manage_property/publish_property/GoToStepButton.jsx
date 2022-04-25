import { motion } from 'framer-motion'

function GoToStepButton({ className, text, goToStep, step }) {
  const onClick = () => {
    goToStep(step)
  }
  return (
    <motion.button type='button' className={className} onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1, duration: 0.15 }}>
      {text}
    </motion.button>
  )
}

export default GoToStepButton
