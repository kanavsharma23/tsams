import React from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

export const AdminBookingCard = ({ booking, onStatusUpdate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="booking-card" data-testid={`admin-booking-${booking._id}`}>
      <div className="booking-header">
        <div className="booking-user">
          <h3>{booking.user.name}</h3>
          <p className="booking-email">{booking.user.email}</p>
        </div>
        <div className="booking-status">
          <span className={`status-badge ${booking.status}`}>
            {booking.status}
          </span>
          <p className="booking-date">{formatDate(booking.createdAt)}</p>
        </div>
      </div>

      <div className="booking-items">
        {booking.items.map((item, index) => (
          <div key={index} className="booking-item">
            <span className="booking-item-name">{item.item.name}</span>
            <span className="booking-item-qty">Qty: {item.quantity}</span>
          </div>
        ))}
      </div>

      {booking.status === 'pending' && (
        <div className="booking-actions">
          <button
            onClick={() => onStatusUpdate(booking._id, 'approved')}
            className="btn-approve"
            data-testid={`approve-btn-${booking._id}`}
          >
            <Check size={20} />
            <span>Approve</span>
          </button>
          <button
            onClick={() => onStatusUpdate(booking._id, 'rejected')}
            className="btn-reject"
            data-testid={`reject-btn-${booking._id}`}
          >
            <X size={20} />
            <span>Reject</span>
          </button>
        </div>
      )}

      {booking.status === 'approved' && (
        <button
          onClick={() => onStatusUpdate(booking._id, 'returned')}
          className="btn-return"
          data-testid={`return-btn-${booking._id}`}
        >
          <RotateCcw size={20} />
          <span>Mark as Returned</span>
        </button>
      )}
    </div>
  );
};
