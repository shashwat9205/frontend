import { API_BASE_URL } from '../config';
// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your Pure Plant Wellness Guide. 🌿 How can I help you fuel your recovery, find premium products, or check your delivery status today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();
    setInput('');

    // Add user message to log
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMessageText
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // POST to the secure local PHP API
      const response = await fetch(API_BASE_URL + 'api/chat.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessageText })
      });

      const data = await response.json();

      if (data.status === 'success' && data.reply) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply
        }]);
      } else {
        throw new Error(data.message || 'Failed to fetch response');
      }
    } catch (err) {
      console.error('Chatbot API error:', err);
      // Fallback local intelligent response (Mocking rule-based logic)
      let botReply = "I'm having trouble connecting to my central server, but I can still help you! ";
      
      const text = userMessageText.toLowerCase();
      if (text.includes('doctor') || text.includes('refer') || text.includes('discount') || text.includes('code')) {
        botReply += "If you have a prescription or referral code from your doctor, you can enter it in the 'Discount Code' input during checkout to receive an exclusive savings on your entire order!";
      } else if (text.includes('shipping') || text.includes('delivery') || text.includes('days')) {
        botReply += "We offer Free Global Shipping on all orders. Standard delivery inside the country takes exactly 3-5 business days.";
      } else if (text.includes('price') || text.includes('buy') || text.includes('cost') || text.includes('product') || text.includes('shop')) {
        botReply += "You can explore our entire catalog of plant-based performance nutrition by visiting our Shop page! Would you like me to take you there?";
      } else if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('support')) {
        botReply += "You can reach our nutrition team at support@pureplant.com or call us at +91 98765 43210. Or visit our Contact page to send a message directly!";
      } else {
        botReply += "Pure Plant offers premium, lab-certified, 100% plant-based sports nutrition. You can explore our Shop page, learn more on our About page, or get in touch through our Contact page!";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-20 sm:right-6 z-[10000] font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-black hover:bg-emerald-800 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 relative group cursor-pointer border border-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>
          {/* Tooltip */}
          <span className="absolute right-16 bg-[#1e2925] text-white text-[9px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Ask Pure Plant AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[400px] h-[500px] sm:h-[550px] bg-white rounded-[2rem] shadow-2xl border border-stone-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#0f1b11] p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center border border-emerald-700">
                <span className="font-serif italic font-bold text-accent-gold text-lg">P</span>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white leading-none">Pure Plant</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Online Assistant</span>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50/50 custom-scrollbar">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-3xl text-xs font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-black text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none shadow-xs shadow-stone-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 text-stone-800 p-4 rounded-3xl rounded-tl-none shadow-xs flex items-center gap-1.5 h-10 shrink-0">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Helper */}
          {messages.length === 1 && (
            <div className="px-5 py-3 bg-white border-t border-stone-100 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleQuickQuestion('What are your best selling supplements?')}
                className="text-[9px] font-bold uppercase tracking-wider text-[#1e2925] bg-stone-50 hover:bg-stone-100 border border-stone-150 py-1.5 px-3 rounded-full cursor-pointer transition-all"
              >
                🏆 Best Sellers
              </button>
              <button
                onClick={() => handleQuickQuestion('What is your shipping policy?')}
                className="text-[9px] font-bold uppercase tracking-wider text-[#1e2925] bg-stone-50 hover:bg-stone-100 border border-stone-150 py-1.5 px-3 rounded-full cursor-pointer transition-all"
              >
                📦 Delivery Time
              </button>
              <button
                onClick={() => handleQuickQuestion('Recommend a recovery formula')}
                className="text-[9px] font-bold uppercase tracking-wider text-[#1e2925] bg-stone-50 hover:bg-stone-100 border border-stone-150 py-1.5 px-3 rounded-full cursor-pointer transition-all"
              >
                🌿 Supplement Advice
              </button>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-stone-100 flex gap-2">
            <input
              type="text"
              placeholder="Ask a question about Pure Plant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-150 focus:border-emerald-600 focus:bg-white px-4 py-3 rounded-full outline-none transition-all text-xs font-semibold text-stone-850"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-full bg-black hover:bg-emerald-800 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
