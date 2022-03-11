import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProfileInput({ label, type, currentValue, editable }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <div className='form-control w-full mt-3 relative'>
      <label>
        <span className='label-text absolute top-0 left-3 translate-y-[-50%] bg-white px-1'>{label}</span>
        <input
          type={type}
          className={`input input-bordered w-full ${editable && 'border-info'}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={!editable}
        />
      </label>
    </div>
  );
}

ProfileInput.defaultProps = {
  editable: false,
  currentValue: '',
};

ProfileInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  editable: PropTypes.bool,
};

export default ProfileInput;
