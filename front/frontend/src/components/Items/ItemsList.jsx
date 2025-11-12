import React, { useState, useEffect } from 'react';
import { ItemCard } from './ItemCard';
import { SearchBar } from './SearchBar';
import { apiService } from '../../services/api';

export const ItemsList = ({ cart, onAddToCart, onViewCart }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await apiService.getItems();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cart.length}
        onViewCart={onViewCart}
      />

      <div className="items-grid">
        {filteredItems.map(item => (
          <ItemCard
            key={item._id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <p className="empty-message">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};
