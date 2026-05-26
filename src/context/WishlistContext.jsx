import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  
  // Get user from local storage
  const userStr = localStorage.getItem('customer_user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (user) {
      fetch(`http://localhost/E-commerce/backendDR/api/wishlist.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setWishlist(data.data);
          }
        })
        .catch(err => console.error('Error fetching wishlist context:', err));
    } else {
      setWishlist([]);
    }
  }, [userStr]); // Refetch if user changes (login/logout)

  const toggleWishlist = (product) => {
    if (!user) {
      // Return false to indicate user needs to login
      return false;
    }

    const isWishlisted = wishlist.some(item => item.product_id === product.id || item.id === product.id);

    // Optimistic UI update
    if (isWishlisted) {
      setWishlist(prev => prev.filter(item => item.product_id !== product.id && item.id !== product.id));
    } else {
      setWishlist(prev => [...prev, { ...product, product_id: product.id }]);
    }

    // API Call
    fetch('http://localhost/E-commerce/backendDR/api/wishlist.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        product_id: product.id,
        action: isWishlisted ? 'remove' : 'add'
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status !== 'success') {
        // Revert on failure (simple implementation)
        console.error('Failed to toggle wishlist');
      }
    })
    .catch(err => console.error('Error toggling wishlist:', err));

    return true; // Indicates success (or optimistic success)
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId || item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
