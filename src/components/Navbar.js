import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className="custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center p-0">
        <Link className="brand-wrapper" to="/">
          <div className="brand-icon">
            <i className="bi bi-fonts"></i>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h1 className="brand-title">{props.title}</h1>
            <span className="brand-badge">PRO</span>
          </div>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <button 
            className="theme-toggle-btn" 
            onClick={props.toggleMode}
            title={props.mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle color theme"
          >
            <i className={`bi ${props.mode === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
            <span>{props.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'TextUtils',
  mode: 'light',
  toggleMode: () => {},
};