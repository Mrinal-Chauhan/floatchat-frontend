import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import "./Chatbot.css";

// Generate a unique session ID for each chat
function generateSessionId() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// API service function to send messages to backend
async function sendMessageToAPI(message, sessionId) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: sessionId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

function sampleInitialChat() {
  return {
    id: Date.now().toString(),
    sessionId: generateSessionId(),
    title: "Welcome — ARGO Data Chat",
    messages: [
      {
        sender: "bot",
        text: "Hello! I'm FloatChat, your AI assistant for ARGO ocean data. I can help you discover insights about ocean temperature, salinity, pressure, and more. What would you like to explore today?",
        time: new Date().toISOString(),
      },
    ],
  };
}

export default function Chatbot() {
  const [chats, setChats] = useState(() => [sampleInitialChat()]);
  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // find active chat object
  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];

  useEffect(() => {
    // ensure activeChatId is valid after any change to chats
    if (!chats.find((c) => c.id === activeChatId)) {
      setActiveChatId(chats[0]?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  useEffect(() => {
    // scroll to bottom on messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      sessionId: generateSessionId(),
      title: "New chat",
      messages: [
        {
          sender: "bot",
          text: "Hi! Ask me anything about ARGO ocean data.",
          time: new Date().toISOString(),
        },
      ],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const selectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  const addMessageToChat = (chatId, message) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
      )
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = {
      sender: "user",
      text: input.trim(),
      time: new Date().toISOString(),
    };
    
    // Add user message immediately
    addMessageToChat(activeChatId, userMsg);
    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    inputRef.current?.focus();

    try {
      // Get the active chat's session ID
      const currentChat = chats.find((c) => c.id === activeChatId);
      if (!currentChat) {
        throw new Error('No active chat found');
      }

      // Call the API
      const botResponse = await sendMessageToAPI(userMessage, currentChat.sessionId);
      
      // Add bot response
      const botMsg = {
        sender: "bot",
        text: botResponse,
        time: new Date().toISOString(),
      };
      addMessageToChat(activeChatId, botMsg);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMsg = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting to the server. Please check if the backend is running and try again.",
        time: new Date().toISOString(),
        isError: true,
      };
      addMessageToChat(activeChatId, errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const formatPreview = (chat) => {
    const last = chat.messages[chat.messages.length - 1];
    const preview = last?.text ?? "";
    return preview.length > 40 ? preview.slice(0, 37) + "..." : preview;
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="sidebar-top">
          <h2 className="brand">FloatChat</h2>
          <button className="new-chat-btn" onClick={createNewChat}>
            + New chat
          </button>
        </div>

        <div className="chat-list">
          {chats.map((c) => (
            <div
              key={c.id}
              className={`chat-list-item ${c.id === activeChatId ? "active" : ""}`}
              onClick={() => selectChat(c.id)}
            >
              <div className="chat-title">{c.title}</div>
              <div className="chat-preview">{formatPreview(c)}</div>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">🌐 3.8M floats · Live data</div>
      </aside>

      {/* Main panel */}
      <main className="chat-main">
        <header className="main-header">
          <div>
            <h1 className="main-title">ARGO Data Chat</h1>
            <p className="main-sub">Ask questions about ocean data in natural language</p>
          </div>
        </header>

        {/* Suggested prompts */}
        <div className="suggestions-row">
          <button onClick={() => handleSuggestionClick("Tell me more about the float near -43.513, 35.468")}>
            Tell me more about the float near -43.513, 35.468
          </button>
          <button onClick={() => handleSuggestionClick("Find profiles from 'Argo Australia' project")}>
            Find profiles from 'Argo Australia' project
          </button>
        </div>

        {/* Chat window */}
        <section className="chat-window">
          {activeChat?.messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`message-row ${msg.sender === "user" ? "from-user" : "from-bot"} ${msg.isError ? "error-message" : ""}`}
            >
              <div className="bubble">
                <div className="bubble-text">
                  {msg.sender === "bot" ? (
                    <ReactMarkdown
                      components={{
                        h1: ({children}) => <h1 className="message-header-1">{children}</h1>,
                        h2: ({children}) => <h2 className="message-header-2">{children}</h2>,
                        h3: ({children}) => <h3 className="message-header-3">{children}</h3>,
                        strong: ({children}) => <strong className="message-strong">{children}</strong>,
                        code: ({children}) => <code className="message-code">{children}</code>,
                        pre: ({children}) => <pre className="message-code-block">{children}</pre>,
                        ul: ({children}) => <ul className="message-ul">{children}</ul>,
                        ol: ({children}) => <ol className="message-ol">{children}</ol>,
                        li: ({children}) => <li className="message-li">{children}</li>,
                        p: ({children}) => <p className="message-paragraph">{children}</p>
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="bubble-time">
                  {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="message-row from-bot">
              <div className="bubble">
                <div className="bubble-text typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </section>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            placeholder={isLoading ? "Sending..." : "Ask about ocean temperature, salinity, or any ARGO data..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
            disabled={isLoading}
          />
          <button 
            className="send-btn" 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            aria-label="Send"
          >
            {isLoading ? "..." : "➤"}
          </button>
        </div>
      </main>
    </div>
  );
}

