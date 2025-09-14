import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

function sampleInitialChat() {
  return {
    id: Date.now().toString(),
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

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      sender: "user",
      text: input.trim(),
      time: new Date().toISOString(),
    };
    addMessageToChat(activeChatId, userMsg);
    setInput("");
    inputRef.current?.focus();

    // placeholder bot reply (simulate latency)
    setTimeout(() => {
      const botMsg = {
        sender: "bot",
        text: "This is a sample ARGO dataset reply.",
        time: new Date().toISOString(),
      };
      addMessageToChat(activeChatId, botMsg);
    }, 600);
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
          <button onClick={() => handleSuggestionClick("Show me temperature trends in the Pacific Ocean")}>
            Show me temperature trends in the Pacific Ocean
          </button>
          <button onClick={() => handleSuggestionClick("What's the salinity data for the Atlantic?")}>
            What's the salinity data for the Atlantic?
          </button>
          <button onClick={() => handleSuggestionClick("Find recent float deployments")}>
            Find recent float deployments
          </button>
          <button onClick={() => handleSuggestionClick("Compare ocean temperatures year over year")}>
            Compare ocean temperatures year over year
          </button>
        </div>

        {/* Chat window */}
        <section className="chat-window">
          {activeChat?.messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`message-row ${msg.sender === "user" ? "from-user" : "from-bot"}`}
            >
              

              <div className="bubble">
                <div className="bubble-text">{msg.text}</div>
                <div className="bubble-time">
                  {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              
            </div>
          ))}

          <div ref={chatEndRef} />
        </section>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about ocean temperature, salinity, or any ARGO data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage} aria-label="Send">
            ➤
          </button>
        </div>
      </main>
    </div>
  );
}

