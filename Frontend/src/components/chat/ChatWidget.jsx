// import React, { useState, useRef, useEffect } from 'react';
// import { MessageCircle, X, Bot, Magnet, LoaderPinwheel } from 'lucide-react';
// import { createChatSession } from '../../services/geminiService';
// import Message from './Message';
// import ChatInput from './ChatInput';

// function ChatWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 'initial',
//       role: 'bot',
//       text: "👋 Hi! I’m Lina, your guide at Aborad Aura. How can I assist you?",
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     chatRef.current = createChatSession();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async (userMessage) => {
//     if (!chatRef.current) return;
//     setIsLoading(true);

//     const userMsg = { id: Date.now().toString(), role: 'user', text: userMessage };
//     const loadingMsg = { id: (Date.now() + 1).toString(), role: 'loading', text: '...' };
//     setMessages((prev) => [...prev, userMsg, loadingMsg]);

//     try {
//       const response = await chatRef.current.sendMessage({ message: userMessage });
//       const botMsg = {
//         id: (Date.now() + 2).toString(),
//         role: 'bot',
//         text: response.text,
//       };
//       setMessages((prev) => [...prev.slice(0, -1), botMsg]);
//     } catch (error) {
//       const errMsg = {
//         id: (Date.now() + 3).toString(),
//         role: 'bot',
//         text: "Sorry, I ran into a problem. Please try again.",
//       };
//       setMessages((prev) => [...prev.slice(0, -1), errMsg]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
//         >
//           <MessageCircle className="w-6 h-6" />
//           <span className='bg-green-600 h-5 w-5'></span>
//         </button>
//       )} */}
//             {!isOpen && (
//         <div className="fixed bottom-5 right-5 z-50 animate-float">
//           <button
//             onClick={() => setIsOpen(true)}
//             className="group relative bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110"
//           >
//             <div className="absolute -top-1 right-1 bg-green-500 text-white text-xs px-2 py-2 rounded-full">
//               {/* Live */}
//             </div>
//             <MessageCircle className="w-6 h-6" />
//             <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
//           </button>
//           <div className="absolute -top-8 right-0 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             Chat with Lina
//           </div>
//         </div>
//       )}

//       {isOpen && (
//         <div className="fixed bottom-5 right-5 w-80 h-[400px] bg-white shadow-xl border border-gray-200 rounded-xl flex flex-col overflow-hidden">
//           <div className="flex py-5 items-center justify-between p-3 bg-blue-600 text-white">
//             <div className="flex items-center space-x-2">
//               <LoaderPinwheel className="w-5 h-5 animate-spin" />
//               <span className="font-semibold text-sm">Abroad Aura Support</span>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
//             {messages.map((msg) => (
//               <Message key={msg.id} message={msg} />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="border-t border-gray-200">
//             <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatWidget;


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, User, Sparkles, ChevronUp, ChevronDown, Send, Mic, Paperclip, LoaderPinwheel } from 'lucide-react';
import { createChatSession } from '../../services/geminiService';
import Message from './Message';
import ChatInput from './ChatInput';
import { assets } from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'bot',
      text: "👋 Hi! I'm Lina, your guide at Abroad Aura. How can I assist you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    chatRef.current = createChatSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      setShowTypingIndicator(true);
      const timer = setTimeout(() => setShowTypingIndicator(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

const handleSendMessage = async (userMessage) => {
  // 🚨 If user is NOT logged in → redirect to login page
  if (!user) {
    setIsOpen(false)
    navigate('/login', { state: { from: window.location.pathname } });
    return;
  }

  if (!chatRef.current || !userMessage.trim()) return;

  setIsLoading(true);

  const userMsg = { 
    id: Date.now().toString(), 
    role: 'user', 
    text: userMessage,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const loadingMsg = { 
    id: (Date.now() + 1).toString(), 
    role: 'loading', 
    text: '...' 
  };

  setMessages((prev) => [...prev, userMsg, loadingMsg]);

  try {
    const response = await chatRef.current.sendMessage({ message: userMessage });
    const botMsg = {
      id: (Date.now() + 2).toString(),
      role: 'bot',
      text: response.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev.slice(0, -1), botMsg]);
  } catch (error) {
    const errMsg = {
      id: (Date.now() + 3).toString(),
      role: 'bot',
      text: "Sorry, I ran into a problem. Please try again.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev.slice(0, -1), errMsg]);
  } finally {
    setIsLoading(false);
  }
};


  const quickReplies = [
    "Tell me about study abroad programs",
    "How to apply for a visa?",
    "Cost of living in Europe",
    "Best universities for engineering"
  ];

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'initial',
        role: 'bot',
        text: "👋 Hi! I'm Lina, your guide at Abroad Aura. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative group">
            <button
              onClick={() => setIsOpen(true)}
              className="group relative bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110"
            >
              <div className="absolute -top-1 right-1 bg-green-500 text-white text-xs px-2 py-2 rounded-full">
                {/* Live */}
              </div>
              <MessageCircle className="w-6 h-6" />
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20"></div>
            </button>
            <div className="absolute -top-12 right-0 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Chat with Lina
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-80 h-[400px] bg-white shadow-xl border border-gray-200 rounded-xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-700 to-purple-600 text-white">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-linear-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center">
                  <LoaderPinwheel className="w-7 h-7 animate-spin hover:w-9 hover:h-9 transition-all duration-300" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Lina - Abroad Aura</h3>
                <p className="text-xs opacity-80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full "></span>
                  Your Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto bg-linear-to-b from-gray-50 to-white">
                {messages.map((msg) => (
                  <Message key={msg.id} message={msg} />
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="px-4 pt-2 border-t border-gray-200/50 h-30 overflow-y-scroll">
                  <p className="text-xs text-gray-500 mb-2 font-medium ">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-2 text-xs bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-700 rounded-full border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:scale-[1.02]"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  placeholder="Ask about study abroad opportunities..."
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatWidget;