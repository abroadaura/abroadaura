import React, { useState } from 'react';
import { Send } from 'lucide-react';

function ChatInput({ onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-2 bg-white border-t border-gray-200 py-3"
    >
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask something..."
        className="flex-1 p-2 text-sm bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}

export default ChatInput;
