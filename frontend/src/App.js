import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Recover from './pages/Recover';
// Hooks
import { useCheckAuth } from './hooks/useCheckAuth';
import ResetPassword from './pages/ResetPassword';

function App() {
  useCheckAuth();
  return (
    <Router>
      <div className='flex flex-col justify-between min-h-screen'>
        <Navbar />
        <main className='container flex flex-col mx-auto py-12 px-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} exact />
            <Route path='/register' element={<Register />} exact />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/recover/' element={<Recover />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <ToastContainer position='bottom-center' autoClose={7500} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
