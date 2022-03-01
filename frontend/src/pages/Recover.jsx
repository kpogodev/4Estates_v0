import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAlternateEmail } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { recoverPassword, reset } from '../features/auth/authSlice';
import Spinner from '../components/shared/Spinner';

function Recover() {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocus] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [ wasSent, setWasSent ] = useState(false);

  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setEmailValid(null);
    }

    if (isSuccess) {
      toast.success('Recovery link has been sent!');
      setWasSent(true);
    }

    dispatch(reset());
  }, [message, isError, isSuccess, dispatch]);

  const validateEmail = (e) => {
    setEmailFocus(false);
    const isValid = e.target.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? true
      : false;
    setEmailValid(isValid);
    if (!isValid && email.length > 0) return toast.error('Please provide valid email address');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(recoverPassword(email));
    setEmail('');
  };

  return (
    <div className='w-full max-w-md mx-auto flex flex-col gap-4'>
      <h1 className='text-6xl font-bold'>Recover Account</h1>
      {wasSent ? (
        <p className='text-xl mt-2'>
          Recover link has been sent to you email address, please check your inbox (Link expires after 15 minutes).
        </p>
      ) : (
        <>
          <p className='text-xl mt-2'>
            To reset your password, enter the email address used to create your account. We'll send you a link which
            will allow you to create a new password.
          </p>
          <form className='form flex flex-col items-start gap-4 w-full' onSubmit={onSubmit}>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Your Email</span>
              </label>
              <label className='input-group input-group-lg'>
                <span>
                  <MdAlternateEmail
                    className={`transition ${emailFocused && 'text-info'} ${emailValid && 'text-success'} ${
                      emailValid === false && 'text-error'
                    }`}
                  />
                </span>
                <input
                  type='email'
                  placeholder='name@domain.com'
                  className={`input input-bordered w-full ${emailValid && 'input-success'} ${
                    emailValid === false && 'input-error'
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={validateEmail}
                />
              </label>
            </div>
            <button
              type='submit'
              className='btn btn-primary text-lg mt-4 flex gap-2 items-center'
              disabled={ email === '' || isLoading ? true : false}
            >
              Send {isLoading && <Spinner className={'w-4 h-h4'} />}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Recover;
