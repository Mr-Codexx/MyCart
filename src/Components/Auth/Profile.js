
import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ userName, onClose, isAuthenticated }) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'fixed', right: 0, top: 0, margin: '20px' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Profile</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {isAuthenticated ? (
              <p><strong>Username:</strong> {userName}</p>
              // Add more profile details here
            ) : (
              <div>
                <p>You are not logged in.</p>
                <Link to="/login" className="btn btn-primary">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
