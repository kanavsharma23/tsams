import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartItem } from './CartItem';
import { EmptyState } from '../Common/EmptyState';
import toast from 'react-hot-toast';
import { API_URL } from '../../services/api';

export const Cart = ({ cart, onRemove, onBack, token, onBookingCreated }) => {
  const createBooking = async () => {
    try {
      const bookingItems = cart.map(c => ({
        item: c.item._id,
        quantity: c.quantity
      }));

      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items: bookingItems })
      });

      if (res.ok) {
        toast.success('Booking created successfully! ✅');
        onBookingCreated();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Booking failed');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      console.error('Booking error:', err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Shopping Cart</h2>
        <button 
          onClick={onBack} 
          className="btn-back"
          data-testid="back-to-items-btn"
        >
          <ArrowLeft size={20} />
          <span>Back to Items</span>
        </button>
      </div>

      {cart.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          message="Your cart is empty"
        />
      ) : (
        <div className="cart-list">
          {cart.map(cartItem => (
            <CartItem
              key={cartItem.item._id}
              cartItem={cartItem}
              onRemove={onRemove}
            />
          ))}

          <button 
            onClick={createBooking} 
            className="btn-checkout"
            data-testid="create-booking-btn"
          >
            Create Booking
          </button>
        </div>
      )}
    </div>
  );
};
