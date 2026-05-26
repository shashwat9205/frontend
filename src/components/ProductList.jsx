import { API_BASE_URL } from '../config';
// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ limit, category, search, priceRange }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeBrand = localStorage.getItem('activeBrand') || 'Brand 1';

  useEffect(() => {
    let url = `${API_BASE_URL}api/products.php?brand=${encodeURIComponent(activeBrand)}`;
    if (category && category !== 'all') {
      url += `&category=${encodeURIComponent(category)}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    // Add Price Filtering to URL
    if (priceRange) {
      url += `&min_price=${priceRange[0]}&max_price=${priceRange[1]}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          let fetchedProducts = data.data;
          if (limit) {
            fetchedProducts = fetchedProducts.slice(0, limit);
          }
          setProducts(fetchedProducts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, [activeBrand, limit, category, search, priceRange]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-3xl"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
            <div className="h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center col-span-full">
        <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest">No Products Found in this Category</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-12">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
