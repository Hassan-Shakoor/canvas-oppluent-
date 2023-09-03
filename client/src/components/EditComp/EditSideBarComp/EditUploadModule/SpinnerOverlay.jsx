// SpinnerOverlay.js
import React from 'react';

const SpinnerOverlay = ({ loading }) => {
  return loading ? (
    <div className="overlay">
      <div className="loader"></div>
    </div>
  ) : null;
};

export default SpinnerOverlay;
