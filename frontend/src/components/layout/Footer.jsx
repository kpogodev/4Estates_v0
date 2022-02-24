import { FaTwitter, FaFacebookF, FaLinkedin } from 'react-icons/fa';
import Logo from '../Logo';

function Footer() {
  const date = new Date();

  return (
    <footer className='p-10 footer bg-secondary text-secondary-content footer-center'>
      <div>
        <Logo fill='#000' firstFill='#185ADB' className='w-32 h-auto mb-4' />
        <p className='font-bold text-lg'>
          4 Estates Ltd.
          <br /> Home and Property Related Services since 2010
        </p>
        <p>Copyright © {date.getFullYear()} - All right reserved</p>
      </div>
      <div>
        <p className='text-lg font-bold'>Visit our social media</p>
        <div className='grid grid-flow-col gap-2'>
          <a href='https://twitter.com' className='btn btn-ghost' rel='noreferrer' target='_blank'>
            <FaTwitter className='text-2xl' />
          </a>
          <a href='https://facebook.com' className='btn btn-ghost' rel='noreferrer' target='_blank'>
            <FaFacebookF className='text-2xl' />
          </a>
          <a href='https://linkedin.com' className='btn btn-ghost' rel='noreferrer' target='_blank'>
            <FaLinkedin className='text-2xl' />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
