import React from 'react';
import './GaugeContainer.scss';

const GaugeContainer = ({ title, children }) => {
  return (
    <div className="gauge-container">
      <h2 className="gauge-title">{title}</h2>
      <div className="gauge-content">
        {children}
      </div>
    </div>
  );
};

export default GaugeContainer;
