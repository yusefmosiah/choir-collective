import React, { useState, useRef, useEffect } from 'react';

interface UserInputProps {
  onSubmit: (content: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="relative z-50 flex items-end bg-base-300 p-4">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        className="flex-1 p-2 bg-base-100 text-base-content border border-base-300 rounded-l-lg resize-none focus:outline-none focus:border-primary min-h-[38px] max-h-[200px]"
        rows={1}
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-content rounded-r-lg h-[38px] disabled:opacity-50 hover:bg-primary-focus"
        disabled={!input.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default UserInput;
