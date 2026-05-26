import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}api/blogs.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setBlog(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-40 text-center bg-white">
        <h2 className="text-3xl font-black text-gray-800 uppercase">Blog Not Found</h2>
        <Link to="/blog" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  let images = [];
  try {
    images = JSON.parse(blog.images) || [];
  } catch (e) {
    // ignore
  }
  
  const imageUrls = images.map(img => `${API_BASE_URL}admin/${img}`);

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <section className="pt-32 pb-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Link to="/blog" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-8">
            <i className="fa-solid fa-arrow-left mr-2"></i> Back to Journal
          </Link>
          <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-4">
            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h4>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {blog.excerpt}
          </p>
        </div>
      </section>

      {/* Main Content & Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Image Gallery */}
          {imageUrls.length > 0 && (
            <div className="mb-16">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-4 bg-gray-100 border border-gray-200">
                <img 
                  src={imageUrls[activeImage]} 
                  alt="Blog featured" 
                  className="w-full h-[50vh] md:h-[70vh] object-cover transition-opacity duration-500" 
                  key={activeImage}
                />
              </div>
              
              {imageUrls.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {imageUrls.map((url, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:font-black prose-headings:text-gray-900 prose-a:text-primary">
            {/* simple rendering of text content, interpreting line breaks */}
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer Share/Tags (Static for now) */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share:</span>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all">
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all">
                <i className="fa-solid fa-link"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
