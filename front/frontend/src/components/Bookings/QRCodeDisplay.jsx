import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const QRCodeDisplay = ({ bookingId }) => {
  return (
    <div className="qr-section">
      <p className="qr-label">Booking QR Code (Show this to collect items):</p>
      <QRCodeSVG 
        value={bookingId} 
        size={160}
        level="H"
        className="qr-image"
        data-testid={`qr-code-${bookingId}`}
      />
    </div>
  );
};
