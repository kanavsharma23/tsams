import React from 'react';
import { QRCodeDisplay } from './QRCodeDisplay';

export const BookingCard = ({ booking }) => {
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
    <div className="booking-card" data-testid={`booking-card-${booking._id}`}>
      <div className="booking-header">
        <div className="booking-user">
          <h3 data-testid={`booking-user-name-${booking._id}`}>
            {booking.user.name}
          </h3>
          <p className="booking-email" data-testid={`booking-user-email-${booking._id}`}>
            {booking.user.email}
          </p>
        </div>
        <div className="booking-status">
          <span 
            className={`status-badge ${booking.status}`}
            data-testid={`booking-status-${booking._id}`}
          >
            {booking.status}
          </span>
          <p className="booking-date" data-testid={`booking-date-${booking._id}`}>
            {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>

      <div className="booking-items">
        {booking.items.map((item, index) => (
          <div 
            key={index} 
            className="booking-item"
            data-testid={`booking-item-${booking._id}-${index}`}
          >
            <span className="booking-item-name">{item.item.name}</span>
            <span className="booking-item-qty">Qty: {item.quantity}</span>
          </div>
        ))}
      </div>

      {booking.status === 'approved' && (
        <QRCodeDisplay bookingId={booking._id} />
      )}
    </div>
  );
};
