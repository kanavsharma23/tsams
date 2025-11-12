import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';

export const SearchBar = ({ searchTerm, onSearchChange, cartCount, onViewCart }) => {
  return (
    <div className="search-section">
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search items by name or category..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          data-testid="search-input"
        />
      </div>

      <div className="cart-summary">
        <span className="cart-count" data-testid="cart-count">
          Cart: <strong>{cartCount}</strong> {cartCount === 1 ? 'item' : 'items'}
        </span>
        <button 
          onClick={onViewCart} 
          className="btn-view-cart"
          data-testid="view-cart-btn"
        >
          <ShoppingCart size={20} />
          <span>View Cart</span>
        </button>
      </div>
    </div>
  );
};
