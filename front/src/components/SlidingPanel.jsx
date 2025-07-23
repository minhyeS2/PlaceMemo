import React from 'react';
import './SlidingPanel.css';

const SlidingPanel = ({ isOpen, onClose, children }) => {
  return (
    <div className={`place-detail-panel ${isOpen ? 'open' : ''}`}>
      <div className="close-btn-wrapper">
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
};

export default SlidingPanel;
