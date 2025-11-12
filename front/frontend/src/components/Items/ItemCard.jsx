import React from 'react';
import { Package } from 'lucide-react';

export const ItemCard = ({ item, onAddToCart }) => {
  const isAvailable = item.available > 0;

  return (
    <div className="item-card" data-testid={`item-card-${item._id}`}>
      <div className="item-header">
        <div className="item-info">
          <h3 data-testid={`item-name-${item._id}`}>{item.name}</h3>
          <p className="item-category" data-testid={`item-category-${item._id}`}>
            {item.category || 'Sports Equipment'}
          </p>
        </div>
        <div className="item-icon-box">
          <Package size={28} strokeWidth={2} />
        </div>
      </div>

      <div className="item-stats">
        <div className="stat-row">
          <span className="stat-label">Total Quantity</span>
          <span className="stat-value" data-testid={`item-total-${item._id}`}>
            {item.total}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Available</span>
          <span 
            className={`stat-value ${isAvailable ? 'available' : 'unavailable'}`}
            data-testid={`item-available-${item._id}`}
          >
            {item.available}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Status</span>
          <span className={`stat-value ${isAvailable ? 'available' : 'unavailable'}`}>
            {isAvailable ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
        </div>
      </div>

      <button
        onClick={() => onAddToCart(item)}
        disabled={!isAvailable}
        className="btn-add-to-cart"
        data-testid={`add-to-cart-btn-${item._id}`}
      >
        {isAvailable ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};
