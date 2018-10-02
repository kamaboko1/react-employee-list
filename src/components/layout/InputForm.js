import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../employees/Employee.css';

 const InputForm = ({
    name, label, type, placeholder, value, onChange, error
 }) => {
  return (
    <div>
       <label htmlFor={name}>{label}</label>
        <input type={type}
                name={name}
                className={classnames(' blank ', {'not-valid': error})}
                placeholder={placeholder} 
                value={value}
                onChange={onChange}
                />
         {error && <div className="error-msg" style={{marginTop: '-18px', marginBottom: '10px'}}>{error}</div>}
    </div>
  );
};

InputForm.defaultProps = {
    type: "text"
}

InputForm.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    error: PropTypes.string
}

export default InputForm;