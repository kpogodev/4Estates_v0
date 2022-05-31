import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from 'components/layout/Layout'
import useLoadGoogleServices from './hooks/useLoadGoogleServices'

//Routes
import Account from 'components/routes/Account'
import AddProperty from './components/routes/AddProperty'
import Dashboard from './components/routes/Dashboard'
import Home from './components/routes/Home'
import Login from './components/routes/Login'
import ManageProperty from './components/routes/ManageProperty'
import NotFound from './components/routes/NotFound'
import PrivateRoute from './components/routes/PrivateRoute'
import PublishProperty from './components/routes/PublishProperty'
import Recover from './components/routes/Recover'
import Register from './components/routes/Register'
import Rents from 'components/routes/Rents'
import ResetPassword from './components/routes/ResetPassword'

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
