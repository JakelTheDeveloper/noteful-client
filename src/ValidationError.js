import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
  if(props.message) {
    return (
        <div>
      <div className="error">{props.message}</div>
      <button onClick = {props.clearError}>X</button>
      </div>
    );
  }

  return <></>
}

ValidationError.defaultProps = {
    message: ''
  }
  
  ValidationError.propTypes = {
    message: PropTypes.string
  }