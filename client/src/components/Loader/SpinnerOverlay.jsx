import React from 'react';

const SpinnerOverlay = ({ loading }) => {
  return loading && (
    <div className="overlay">
      <div className="loader"></div>
    </div>
  ) 
};

export default SpinnerOverlay;
