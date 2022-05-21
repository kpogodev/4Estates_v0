import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import Navbar from './Navbar'
import Footer from './Footer'
import SVGSprite from 'assets/SVGSprite'
import 'react-toastify/dist/ReactToastify.css'

function Layout() {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-base-200'>
      <SVGSprite />
      <Navbar />
      <main className='container flex flex-col mx-auto py-5 px-[15px] md:py-12'>
        <AnimatePresence exitBeforeEnter>
          <Outlet />
        </AnimatePresence>
      </main>
      <ToastContainer position='bottom-center' autoClose={5000} />
      <Footer />
    </div>
  )
}

export default Layout
