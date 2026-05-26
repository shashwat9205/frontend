import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const imageUrl = product.image_url 
    ? (product.image_url.startsWith('http') 
        ? product.image_url 
        : `http://localhost/E-commerce/backend/admin/${product.image_url}`)
    : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600';

  const isOutOfStock = parseInt(product.stock) <= 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    const success = toggleWishlist(product);
    if (!success) {
      // Not logged in
      navigate('/login');
    }
  };

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-white p-3 sm:p-4 rounded-2xl sm:rounded-[2rem] shadow-xs border border-primary/5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(27,67,50,0.05)] min-w-0 overflow-hidden">
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[3/4] bg-[#f4f3ee] rounded-xl sm:rounded-[1.75rem] overflow-hidden mb-3 sm:mb-6 transition-all duration-750 group-hover:-translate-y-1 block border border-primary/5">
        <img 
          src={imageUrl} 
          alt={product.name} 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600'; }}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${isOutOfStock ? 'grayscale opacity-35' : 'brightness-100 group-hover:brightness-[1.02]'}`}
        />
        
        {/* Minimalist Stock Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
          <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[7px] sm:text-[8px] font-bold uppercase tracking-wider shadow-sm ${isOutOfStock ? 'bg-white text-stone-400 font-sans' : 'bg-primary text-white font-sans'}`}>
            {isOutOfStock ? 'Sold Out' : 'Available'}
          </span>
        </div>

        {/* Wishlist Heart Icon */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
          <button 
            onClick={handleWishlist}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-sm z-30 cursor-pointer
              ${wishlisted ? 'bg-accent-gold text-stone-900' : 'bg-white text-stone-300 hover:text-primary sm:opacity-0 sm:group-hover:opacity-100'}`}
          >
            <Heart size={14} className={wishlisted ? "fill-current" : ""} />
          </button>
        </div>

        {/* Hover Action - Clean Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-[#0f1b11]/5 transition-all duration-500 flex items-end p-3 sm:p-5">
          <button 
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-full py-2.5 sm:py-3 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-[9px] shadow-lg translate-y-4 opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 cursor-pointer ${isOutOfStock ? 'bg-[#faf9f6] text-stone-400' : 'bg-white text-stone-900 hover:bg-primary hover:text-white'}`}
          >
            {isOutOfStock ? 'Back Soon' : 'Quick Add +'}
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="space-y-1 sm:space-y-1.5 px-1 sm:px-2 pb-1 sm:pb-2">
        <p className="text-accent-gold font-bold uppercase tracking-wider text-[8px] sm:text-[9px] font-sans">
          {product.category || 'General'}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-4">
          <Link to={`/product/${product.slug}`} className="no-underline flex-1 min-w-0 w-full overflow-hidden">
            <h3 className="text-xs sm:text-base font-semibold text-[#1e2925] leading-tight font-serif break-words group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-primary font-bold text-xs sm:text-sm font-sans shrink-0">
            ₹{parseFloat(product.price).toLocaleString('en-IN')}
          </p>
        </div>
        <p className="hidden sm:block text-stone-450 text-[11px] font-medium leading-relaxed line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scientifically backed organic recovery formula.
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
