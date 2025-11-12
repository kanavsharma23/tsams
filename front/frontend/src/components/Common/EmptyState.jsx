import React from 'react';

export const EmptyState = ({ icon: Icon, message }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={80} strokeWidth={1.5} />
      </div>
      <p className="empty-message">{message}</p>
    </div>
  );
};
