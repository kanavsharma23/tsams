import React from 'react';
import { X, Check, XCircle, RotateCcw } from 'lucide-react';

export const ScanModal = ({ booking, onClose, onStatusUpdate }) => {
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Scanned Booking</h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-user-info">
            <h3>{booking.user.name}</h3>
            <p>{booking.user.email}</p>
          </div>

          <div className="booking-status" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span className={`status-badge ${booking.status}`}>
              {booking.status}
            </span>
          </div>

          <p className="modal-booking-date">
            Booked on: {formatDate(booking.createdAt)}
          </p>

          <div className="booking-items">
            {booking.items.map((item, index) => (
              <div key={index} className="booking-item">
                <span className="booking-item-name">{item.item.name}</span>
                <span className="booking-item-qty">Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          {booking.status === 'pending' && (
            <>
              <button
                onClick={() => onStatusUpdate(booking._id, 'approved')}
                className="btn-approve"
              >
                <Check size={20} />
                Approve
              </button>
              <button
                onClick={() => onStatusUpdate(booking._id, 'rejected')}
                className="btn-reject"
              >
                <XCircle size={20} />
                Reject
              </button>
            </>
          )}

          {booking.status === 'approved' && (
            <button
              onClick={() => onStatusUpdate(booking._id, 'returned')}
              className="btn-return"
            >
              <RotateCcw size={20} />
              Mark as Returned
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
