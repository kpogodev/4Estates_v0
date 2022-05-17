import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
//Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PrivateRoute from './pages/PrivateRoute'
import SVGSprite from 'assets/SVGSprite'
//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Recover from './pages/Recover'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import AddProperty from './pages/AddProperty'
import ManageProperty from './pages/ManageProperty'
import PublishProperty from './pages/PublishProperty'
import Settings from 'pages/Settings'
import Rents from 'pages/Rents'
// Hooks
import useCheckAuth from './hooks/useCheckAuth'
import useLoadGoogleServices from './hooks/useLoadGoogleServices'
import React from 'react'

function App() {
  const location = useLocation()
  useCheckAuth()
  useLoadGoogleServices()

  return (
    <div className='flex flex-col justify-between min-h-screen bg-base-200'>
      <SVGSprite />
      <Navbar />
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        <main className='container flex flex-col mx-auto py-5 px-[15px] md:py-12'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} exact />
            <Route path='/register' element={<Register />} exact />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/recover/' element={<Recover />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/*' element={<NotFound />} />
            <Route path='/rent' element={<Rents />} />
            {/* PRIVATE ROUTES */}
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/add-property' element={<PrivateRoute />}>
              <Route path='/add-property' element={<AddProperty />} />
            </Route>
            <Route path='/manage-property/:id' element={<PrivateRoute />}>
              <Route path='/manage-property/:id' element={<ManageProperty />} />
            </Route>
            <Route path='/publish-property/:id' element={<PrivateRoute />}>
              <Route path='/publish-property/:id' element={<PublishProperty />} />
            </Route>
            <Route path='/settings' element={<PrivateRoute />}>
              <Route path='/settings' element={<Settings />} />
            </Route>
          </Routes>
          <ToastContainer position='bottom-center' autoClose={5000} />
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
