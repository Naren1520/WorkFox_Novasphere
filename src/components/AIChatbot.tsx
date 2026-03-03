import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hi! I\'m your WorkFox AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateId = () => `msg-${Date.now()}-${Math.random()}`;

  const sendMessage = async () => {
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    // Add user message to chat
    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `You are a helpful AI assistant for WorkFox, a decentralized freelance platform built on Algorand blockchain.

Your role is to assist users with:
- How to use WorkFox (posting tasks, claiming tasks, submitting work)
- Blockchain and Algorand technology basics
- Smart contracts and secure payments
- General freelancing advice and best practices
- Platform features and troubleshooting

Always be friendly, concise, and helpful. Keep responses under 200 words when possible.`;

      const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}`;

      const result = await model.generateContent(fullPrompt);
      const responseText = result.response.text();

      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get response from AI. Please try again.';
      setError(errorMessage);

      const errorMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
          style={{
            background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.1)',
          }}
          title="Open AI Chat"
        >
          <img
            src="/images/logo.png"
            alt="AI Assistant"
            className="w-10 h-10 rounded-full object-contain"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4ff] rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col z-50 flex-col"
          style={{
            background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 rounded-t-2xl"
            style={{
              background: 'linear-gradient(135deg, #2d1b69 0%, #1a0033 100%)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="AI"
                  className="w-8 h-8 rounded-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white" style={{ color: '#d4af37' }}>
                  WorkFox AI
                </h3>
                <p className="text-xs" style={{ color: '#b0b0b8' }}>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-lg p-2 transition-colors"
              style={{ color: '#d4af37' }}
              title="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.5) 0%, rgba(26, 26, 46, 0.5) 100%)',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-xs rounded-lg px-4 py-3"
                  style={
                    message.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)',
                          color: '#0f0f1e',
                        }
                      : {
                          background: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                          color: '#b0b0b8',
                        }
                  }
                >
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>
                  <p
                    className="text-xs mt-2 opacity-70"
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-lg px-4 py-3"
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#d4af37' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#d4af37', animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#d4af37', animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div
                  className="text-xs px-3 py-2 rounded-lg"
                  style={{
                    background: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    color: '#ff6b6b',
                  }}
                >
                  {error}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="p-4 rounded-b-2xl border-t"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)',
              borderTopColor: 'rgba(212, 175, 55, 0.2)',
            }}
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-lg focus:outline-none transition-all disabled:opacity-50"
                style={{
                  background: 'rgba(15, 15, 30, 0.6)',
                  color: '#b0b0b8',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                }}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)',
                  color: '#0f0f1e',
                }}
                title="Send message"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
