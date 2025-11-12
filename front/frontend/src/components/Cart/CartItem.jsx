import React from 'react';
import { Trash2 } from 'lucide-react';

export const CartItem = ({ cartItem, onRemove }) => {
  return (
    <div className="cart-item-card" data-testid={`cart-item-${cartItem.item._id}`}>
      <div className="cart-item-info">
        <h3 className="cart-item-name" data-testid={`cart-item-name-${cartItem.item._id}`}>
          {cartItem.item.name}
        </h3>
        <p className="cart-item-available">
          Available: {cartItem.item.available} units
        </p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <span className="stat-label">Quantity:</span>
          <div className="quantity-display" data-testid={`cart-item-quantity-${cartItem.item._id}`}>
            {cartItem.quantity}
          </div>
        </div>

        <button
          onClick={() => onRemove(cartItem.item._id)}
          className="btn-remove-item"
          data-testid={`remove-item-btn-${cartItem.item._id}`}
        >
          <Trash2 size={18} style={{ display: 'inline', marginRight: '6px' }} />
          Remove
        </button>
      </div>
    </div>
  );
};
