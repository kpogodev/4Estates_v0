import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from 'components/layout/Layout'
import useLoadGoogleServices from './hooks/useLoadGoogleServices'

//Routes
import Account from 'components/pages/Account'
import AddProperty from './components/pages/AddProperty'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import ManageProperty from './components/pages/ManageProperty'
import NotFound from './components/pages/NotFound'
import PrivateRoute from './components/pages/PrivateRoute'
import PublishProperty from './components/pages/PublishProperty'
import Recover from './components/pages/Recover'
import Register from './components/pages/Register'
import Rents from 'components/pages/Rents'
import ResetPassword from './components/pages/ResetPassword'

function App() {
  const location = useLocation()
  useLoadGoogleServices()

  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} exact />
        <Route path='register' element={<Register />} exact />
        <Route path='notfound' element={<NotFound />} />
        <Route path='recover/' element={<Recover />} />
        <Route path='reset-password/:token' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
        <Route path='rent' element={<Rents />} />
        {/* PRIVATE ROUTES */}
        <Route path='user' element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path='account' element={<Account />} />
          <Route path='add-property' element={<AddProperty />} />
          <Route path='manage-property/:id' element={<ManageProperty />} />
          <Route path='publish-property/:id' element={<PublishProperty />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

