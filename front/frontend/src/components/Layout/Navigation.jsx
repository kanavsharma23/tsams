import React from 'react';
import { Package, ShoppingCart, Calendar, Shield, Camera } from 'lucide-react';

export const Navigation = ({ activeView, onViewChange, isAdmin }) => {
  const navItems = [
    { id: 'items', label: 'Browse Items', icon: Package },
    { id: 'cart', label: 'My Cart', icon: ShoppingCart },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
  ];

  if (isAdmin) {
    navItems.push(
      { id: 'admin', label: 'Admin Panel', icon: Shield },
      { id: 'scan', label: 'Scan QR', icon: Camera }
    );
  }

  return (
    <nav className="nav-tabs">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`nav-tab ${activeView === item.id ? 'active' : ''}`}
              data-testid={`nav-${item.id}`}
            >
              <Icon size={18} style={{ display: 'inline', marginRight: '6px' }} />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
