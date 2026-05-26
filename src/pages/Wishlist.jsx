import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, X as XIcon } from 'lucide-react';

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Get user from local storage
  const user = JSON.parse(localStorage.getItem('customer_user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, navigate]);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Your Wishlist</h1>
            <p className="text-gray-500 text-sm mt-2 font-medium">Saved items you want to look at later.</p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Heart size={48} strokeWidth={1} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 text-sm mb-8">Looks like you haven't saved anything yet.</p>
            <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-primary/30">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.wishlist_id || item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group relative flex flex-col">
                
                {/* Remove Button */}
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm transition-all"
                  title="Remove from wishlist"
                >
                  <XIcon size={16} />
                </button>

                {/* Image */}
                <Link to={`/product/${item.slug}`} className="block h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden relative">
                  <img src={`http://localhost/E-commerce/backendDR/${item.image_url}`} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="font-black text-gray-900 leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-primary font-black mt-auto">₹{parseFloat(item.price).toLocaleString()}</p>
                </div>

                {/* Action */}
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
