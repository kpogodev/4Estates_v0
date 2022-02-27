import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='navbar bg-primary'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label className='btn btn-ghost btn-circle lg:hidden text-base-100' tabIndex={0}>
            <FaBars className='h-5 w-5' />
          </label>
          <ul tabIndex={0} className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <Link to='/'>Homepage</Link>
            </li>
            <li>
              <Link to='/buy'>Buy</Link>
            </li>
            <li>
              <Link to='/rent'>Rent</Link>
            </li>
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost normal-case lg:text-xl font-bold text-base-100'>
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
        <Link to='/login' className='btn btn-secondary lg:text-xl btn-sm lg:btn-md'>
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
