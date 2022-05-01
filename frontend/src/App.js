import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
//Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PrivateRoute from './pages/PrivateRoute'

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

// Hooks
import useCheckAuth from './hooks/useCheckAuth'
import useLoadGoogleServices from './hooks/useLoadGoogleServices'

function App() {
  useCheckAuth()
  useLoadGoogleServices()
  return (
    <Router>
      <div className='flex flex-col justify-between min-h-screen bg-[#fdfdfd]'>
        <Navbar />
        <AnimatePresence exitBeforeEnter={true}>
          <main className='container flex flex-col mx-auto py-5 px-[15px] md:py-12 md:px-6'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} exact />
              <Route path='/register' element={<Register />} exact />
              <Route path='/notfound' element={<NotFound />} />
              <Route path='/recover/' element={<Recover />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} />
              <Route path='/*' element={<NotFound />} />
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
            </Routes>
            <ToastContainer position='bottom-center' autoClose={5000} />
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  )
}

export default App
