import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='w-full'>
      <h1 className='text-6xl font-bold'>Sign In</h1>
      <p className='text-xl mt-2'>
        Don't have an account?{' '}
        <Link className='btn btn-link p-0' to='/register'>
          Register
        </Link>
      </p>
      <form className='form my-4 flex flex-col items-start gap-4 w-full max-w-md'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Your Email</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdAlternateEmail />
            </span>
            <input type='text' placeholder='name@domain.com' className='input input-bordered w-full' />
          </label>
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdPassword />
            </span>
            <input type='password' placeholder='******' className='input input-bordered w-full' />
          </label>
        </div>
        <div className='flex justify-between items-center w-full mt-6'>
          <Link className='btn btn-link capitalize text-xl                  ' to='/recover'>
            Forgotten your password?
          </Link>
          <button type='submit' class='btn btn-primary'>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
