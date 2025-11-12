import React from 'react';
import { Package, LogOut } from 'lucide-react';

export const Header = ({ user, onLogout }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-logo">
            <Package size={28} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <h1>TSAMS</h1>
            <p>Sports Asset Management</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="user-profile">
            <div className="user-avatar" data-testid="user-avatar">
              {getInitials(user?.name)}
            </div>
            <div className="user-details">
              <h3 data-testid="user-name">{user?.name || 'User'}</h3>
              <p data-testid="user-email">{user?.email}</p>
            </div>
          </div>

          {user?.isAdmin && (
            <span className="admin-badge" data-testid="admin-badge">Admin</span>
          )}

          <button 
            onClick={onLogout} 
            className="btn-logout"
            data-testid="logout-btn"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
