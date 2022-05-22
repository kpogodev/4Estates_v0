import HeroSwiper from 'components/homepage/slider/HeroSwiper'
import SearchBox from 'components/homepage/search/SearchBox'
import Hero from 'components/shared/Hero'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'


function Home() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <Hero>
        <HeroSwiper />
        <SearchBox />
      </Hero>
    </motion.div>
  )
}

export default Home
