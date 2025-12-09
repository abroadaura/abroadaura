import React from 'react';
import { Bot, UserRound } from 'lucide-react';
import { assets } from '../../assets/assets';
import ReactMarkdown from 'react-markdown';

function Message({ message }) {
  const isUser = message.role === 'user';
  const isLoading = message.role === 'loading';

  return (
    <div className={`flex my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1">
          <img src={assets.bot} alt="AI" className="w-4 h-4" />
        </div>
      )}
      
      <div
        className={`px-4 py-2.5 rounded-lg max-w-[80%] shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : isLoading ? 'bg-gray-50' : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></span>
            </div>
            <span className="text-sm text-gray-500">Thinking...</span>
          </div>
        ) : (
           <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p className="mb-2 last:mb-0 text-sm leading-relaxed" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className={`font-semibold ${
                      isUser ? 'text-white' : 'text-gray-900'
                    }`} {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-sm" {...props} />
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>          
        )}
      </div>
      
    </div>
  );
}

export default Message;