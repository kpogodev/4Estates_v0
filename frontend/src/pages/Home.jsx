import HeroSwiper from 'components/homepage/HeroSwiper'
import Hero from 'components/shared/Hero'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'

function Home() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <Hero>
        <HeroSwiper />
      </Hero>
    </motion.div>
  )
}

export default Home
