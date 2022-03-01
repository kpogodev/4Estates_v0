import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdPassword } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword, reset } from '../features/auth/authSlice';
import Spinner from '../components/shared/Spinner';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocus] = useState(false);
  const [passwordValid, setPasswordValid] = useState(null);

  const [rePassword, setRePassword] = useState('');
  const [rePasswordFocused, setRePasswordFocus] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(null);

  const { token } = useParams();

  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Your password has been changed');
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  const validatePassword = (e) => {
    setPasswordFocus(false);
    const isValid = e.target.value.length > 0 ? true : false;
    setPasswordValid(isValid);
  };

  const validateRePassword = (e) => {
    setRePasswordFocus(false);
    const isValid = e.target.value === password ? true : false;
    if (!isValid) {
      toast.error('Passwords must match');
    }
    setRePasswordValid(isValid);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== rePassword) return toast.error('Passwords must match');

    dispatch(resetPassword({ password, token }));
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <h1 className='text-6xl font-bold'>Rest Password</h1>
      <p className='text-xl my-4'>Please provide a new password.</p>
      <form className='form flex flex-col items-start gap-4 w-full' onSubmit={onSubmit}>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdPassword
                className={`transition ${passwordFocused && 'text-info'} ${passwordValid && 'text-success'}`}
              />
            </span>
            <input
              type='password'
              placeholder='********'
              className={`input input-bordered w-full ${passwordValid && 'input-success'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={validatePassword}
              autoComplete='new-password'
            />
          </label>
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Repeat Password</span>
          </label>
          <label className='input-group input-group-lg'>
            <span>
              <MdPassword
                className={`transition ${rePasswordFocused && 'text-info'} ${rePasswordValid && 'text-success'} ${
                  rePasswordValid === false && 'text-error'
                }`}
              />
            </span>
            <input
              type='password'
              placeholder='********'
              className={`input input-bordered w-full ${rePasswordValid && 'input-success'} ${
                rePasswordValid === false && 'input-error'
              }`}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              onFocus={() => setRePasswordFocus(true)}
              onBlur={validateRePassword}
              autoComplete='new-password'
            />
          </label>
        </div>
        <button
          type='submit'
          className='btn btn-primary text-lg mt-4 flex gap-2 items-center'
          disabled={password === '' || rePassword === '' || isLoading ? true : false}
        >
          Send {isLoading && <Spinner className={'w-4 h-h4'} />}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
