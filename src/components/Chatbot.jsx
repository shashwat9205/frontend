import { API_BASE_URL } from '../config';
// src/components/Chatbot.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your Biohackerz Longevity & Protocol Guide. ⚡ How can I help you optimize your cellular health, explore clinical stacks, or track your order today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
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
      // POST to the secure PHP API
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
        botReply += "If you have a clinical prescription or referral code from your practitioner, you can enter it in the 'Discount Code' input during checkout for preferred pricing!";
      } else if (text.includes('shipping') || text.includes('delivery') || text.includes('days')) {
        botReply += "We offer complimentary expedited shipping across India. Most protocol deliveries arrive within 3-5 business days.";
      } else if (text.includes('nmn') || text.includes('nad') || text.includes('price') || text.includes('buy') || text.includes('stack') || text.includes('shop')) {
        botReply += "You can explore our entire catalog of clinical-grade longevity and cellular optimization stacks on our Shop page! Would you like me to guide you there?";
      } else if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('support')) {
        botReply += "You can reach our longevity advisory team at support@biohackersfuel.com or call us at +91 98765 43210. You can also visit our Contact page to send an inquiry directly!";
      } else {
        botReply += "Biohackerz offers clinical-grade, third-party HPLC-tested longevity and cellular optimization protocols. Explore our curated catalog on the Shop page, assess your biological age via our Biohacking Quiz, or reach out anytime!";
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
    <div className="fixed bottom-20 right-4 sm:bottom-22 sm:right-6 z-[10000] font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#0a192f] hover:bg-[#122849] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 relative group cursor-pointer border border-[#b89047]/40"
          aria-label="Open Biohackerz AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#b89047]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b89047] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#b89047] border border-[#0a192f]"></span>
          </span>
          {/* Tooltip */}
          <span className="absolute right-16 bg-[#0a192f] text-white text-[9px] font-black uppercase tracking-wider py-1.5 px-3 rounded-lg shadow-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Ask Biohackerz AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[400px] h-[500px] sm:h-[550px] bg-[#071324] text-white rounded-[2rem] shadow-2xl border border-white/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#0a192f] p-5 flex justify-between items-center text-white border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#b89047]/20 rounded-full flex items-center justify-center border border-[#b89047]/40 shadow-sm">
                <span className="font-serif italic font-bold text-[#b89047] text-lg">B</span>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white leading-none">Biohackerz AI</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-[#b89047] rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-bold text-[#b89047] uppercase tracking-widest leading-none">Longevity Protocol Guide</span>
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
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0a192f]/50 custom-scrollbar">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-3xl text-xs font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#b89047] text-[#0a192f] font-semibold rounded-tr-none shadow-sm'
                      : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-none shadow-xs backdrop-blur-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 text-slate-300 p-4 rounded-3xl rounded-tl-none shadow-xs flex items-center gap-1.5 h-10 shrink-0">
                  <span className="w-1.5 h-1.5 bg-[#b89047] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#b89047] rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-[#b89047] rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Helper */}
          {messages.length === 1 && (
            <div className="px-5 py-3 bg-[#0a192f] border-t border-white/10 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleQuickQuestion('What are your flagship longevity stacks?')}
                className="text-[9px] font-bold uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-[#b89047]/20 border border-white/10 hover:border-[#b89047]/40 py-1.5 px-3 rounded-full cursor-pointer transition-all"
              >
                ⚡ Flagship Stacks
              </button>
              <button
                onClick={() => handleQuickQuestion('How does the Biohacking Quiz work?')}
                className="text-[9px] font-bold uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-[#b89047]/20 border border-white/10 hover:border-[#b89047]/40 py-1.5 px-3 rounded-full cursor-pointer transition-all"
              >
                🧬 Bio-Quiz
              </button>
              <button
                onClick={() => handleQuickQuestion('What is your delivery timeframe?')}
                className="text-[9px] font-bold uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-[#b89047]/20 border border-white/10 hover:border-[#b89047]/40 py-1.5 px-3 rounded-full cursor-pointer transition-all"
              >
                📦 Shipping Time
              </button>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#0a192f] border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Ask a question about Biohackerz..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#b89047] focus:bg-white/10 px-4 py-3 rounded-full outline-none transition-all text-xs font-medium text-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-full bg-[#b89047] hover:bg-[#cba463] text-[#0a192f] flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-40"
              aria-label="Send message"
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
