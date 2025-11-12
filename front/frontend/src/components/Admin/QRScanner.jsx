import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ScanModal } from './ScanModal';
import toast from 'react-hot-toast';

export const QRScanner = ({ token, onBack }) => {
  const [scannedBooking, setScannedBooking] = useState(null);

  const handleScan = async (result) => {
    if (!result || !result[0]) return;

    const bookingId = result[0].rawValue;
    
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setScannedBooking(data);
        toast.success('Booking scanned successfully! ✅');
      } else {
        toast.error('Booking not found');
      }
    } catch (err) {
      console.error('Scan error:', err);
      toast.error('Error scanning QR code');
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        toast.success(`Booking ${status}! ✅`);
        setScannedBooking(null);
      } else {
        toast.error('Failed to update booking');
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Error updating booking');
    }
  };

  return (
    <div className="scanner-container">
      <div className="page-header">
        <h2 className="page-title">QR Code Scanner</h2>
        <button 
          onClick={onBack} 
          className="btn-back"
          data-testid="back-from-scanner-btn"
        >
          <ArrowLeft size={20} />
          <span>Back to Admin</span>
        </button>
      </div>

      <div className="scanner-box">
        <Scanner
          onScan={handleScan}
          constraints={{
            facingMode: 'environment'
          }}
          styles={{
            container: {
              borderRadius: '16px',
              overflow: 'hidden'
            }
          }}
        />
        <div className="scanner-hint">
          <CheckCircle size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Point camera at the booking QR code to scan
        </div>
      </div>

      {scannedBooking && (
        <ScanModal
          booking={scannedBooking}
          onClose={() => setScannedBooking(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};
