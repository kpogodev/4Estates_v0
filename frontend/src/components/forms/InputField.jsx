import React from 'react';
import PropTypes from 'prop-types';

function InputField({ type, placeholder, className, value, onChange, onFocus, onBlur }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => onFocus(true)}
      onBlur={(e) => onBlur()}
    />
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputField;
