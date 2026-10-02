import React from 'react';

export default function Alert(props) {
  if (!props.alert) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill alert-icon-success';
      case 'warning':
        return 'bi-exclamation-triangle-fill alert-icon-warning';
      default:
        return 'bi-info-circle-fill alert-icon-info';
    }
  };

  return (
    <div className="toast-container-fixed" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="modern-alert">
        <i className={`bi ${getIcon(props.alert.type)}`}></i>
        <div>
          <span>{props.alert.message}</span>
        </div>
        <button 
          type="button" 
          className="alert-close-btn" 
          onClick={props.onClose}
          aria-label="Close"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}
