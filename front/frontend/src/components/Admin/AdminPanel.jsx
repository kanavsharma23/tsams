import React, { useState, useEffect, useCallback } from 'react';
import { Camera } from 'lucide-react';
import { AdminBookingCard } from './AdminBookingCard';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { apiService, API_URL } from '../../services/api';

export const AdminPanel = ({ token, onScanQR }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      const data = await apiService.getBookings(token);
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        fetchBookings(); // Refresh list
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Admin Panel - All Bookings</h2>
        <button 
          onClick={onScanQR} 
          className="btn-scan-qr"
          data-testid="scan-qr-btn"
        >
          <Camera size={20} />
          <span>Scan QR Code</span>
        </button>
      </div>

      <div className="bookings-grid">
        {bookings.map(booking => (
          <AdminBookingCard
            key={booking._id}
            booking={booking}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="empty-state">
          <p className="empty-message">No bookings found.</p>
        </div>
      )}
    </div>
  );
};
