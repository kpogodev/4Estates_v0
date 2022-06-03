import HeroSwiper from 'components/homepage/slider/HeroSwiper'
import SearchBox from 'components/homepage/search/SearchBox'
import Hero from 'components/shared/Hero'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'

function Home() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit' className='container flex flex-col mx-auto py-5 md:py-12 px-3'>
      <Hero>
        <HeroSwiper />
        <SearchBox />
      </Hero>
    </motion.div>
  )
}

export default Home
