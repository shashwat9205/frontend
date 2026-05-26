import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/E-commerce/backendDR/api/blogs.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setBlogs(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Journal</h4>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase leading-none mb-6">
            The Performance <br /> Blog
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Discover the latest in plant-based nutrition, expert training advice, and science-backed strategies to elevate your potential.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {blogs.length === 0 ? (
            <div className="text-center text-gray-400 font-bold uppercase tracking-widest text-sm py-20">
              No blogs available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map(blog => {
                let images = [];
                try {
                  images = JSON.parse(blog.images);
                } catch (e) {
                  // ignore
                }
                const firstImg = images && images.length > 0 ? `http://localhost/E-commerce/backendDR/admin/${images[0]}` : 'https://placehold.co/600x400/eeeeee/cccccc?text=No+Image';

                return (
                  <Link to={`/blog/${blog.id}`} key={blog.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                      <img src={firstImg} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-800">
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h2 className="text-2xl font-black text-gray-800 mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest mt-auto">
                        <span>Read Article</span>
                        <i className="fa-solid fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform"></i>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
