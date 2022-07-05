import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, selectIsAuth, selectUser, selectIsLoading } from 'redux/auth/authSlice'
import { reset as resetProfile } from 'redux/profiles/profilesSlice'
import Spinner from 'components/common/Spinner'
import Avatar from 'components/common/Avatar'
import diamond_icon from 'assets/diamond-icon.svg'

function Navbar() {
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logoutUser())
    dispatch(resetProfile())
  }

  return (
    <div className='navbar bg-primary z-[100]'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label className='btn btn-ghost btn-circle lg:hidden text-base-100' tabIndex={0}>
            <FaBars className='h-5 w-5' />
          </label>
          <ul tabIndex={0} className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <Link to='/' onClick={(e) => e.target.blur()}>
                Homepage
              </Link>
            </li>
            <li>
              <Link to='/buy' onClick={(e) => e.target.blur()}>
                Buy
              </Link>
            </li>
            <li>
              <Link to='/rent' onClick={(e) => e.target.blur()}>
                Rent
              </Link>
            </li>
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost btn-sm lg:btn-md normal-case text-xl lg:text-2xl font-bold text-base-100'>
          4Estates
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <Link to='/buy' className='text-base-100 lg:text-xl font-semibold'>
              Buy
            </Link>
          </li>
          <li>
            <Link to='/rent' className='text-base-100 lg:text-xl font-semibold'>
              Rent
            </Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        {isLoading && <Spinner className='w-7 h-7' />}
        {isAuth && !isLoading && (
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='relative btn btn-ghost btn-circle avatar'>
              {user?.is_premium.active && (
                <span className='badge-sm absolute top-0 left-0 p-0'>
                  <img className='block' src={diamond_icon} alt='' />
                  <span className='tooltip tooltip-accent tooltip-left absolute w-full h-full top-0 left-0' data-tip='Premium'></span>
                </span>
              )}
              <Avatar user={user} />
            </label>
            <ul tabIndex={0} className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'>
              <li>
                <Link to='/user' onClick={(e) => e.target.blur()}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/user/account' onClick={(e) => e.target.blur()}>
                  My Account
                </Link>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        {!isAuth && !isLoading && (
          <Link to='/login' className='btn btn-secondary text-xl btn-sm lg:btn-md lg:text-lg'>
            Sign in
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
