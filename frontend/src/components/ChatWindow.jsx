import { useEffect, useState } from "react";
import api from "../api/api";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useRef } from "react";

function ChatWindow({
  selectedConversation,
  setSelectedConversation,
  messages,
  setMessages,
  onConversationCreated,
}) {
  const [loading, setLoading] = useState(false);
  //   const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    loadMessages();
  }, [selectedConversation]);

  const loadMessages = async () => {
    try {
      const response = await api.get(
        `conversations/${selectedConversation}/messages/`,
      );

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("chat/", {
        conversation_id: selectedConversation,

        message: input,
      });

      setSelectedConversation(response.data.conversation_id);

      setMessages((prev) => [
        ...prev,
        response.data.user_message,
        response.data.assistant_message,
      ]);

      setInput("");

      if (onConversationCreated) {
        onConversationCreated();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col flex-1 h-screen bg-[#212121]">
      {/* Messages */}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {!loading && messages.length === 0 && (
            <div className="h-full flex items-center justify-center mt-32">
              <h1 className="text-3xl font-semibold text-white">
                How can I help you today?
              </h1>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {loading && (
            <div className="text-gray-400 text-sm">AI is thinking...</div>
          )}

          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* Input */}

      <MessageInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}

export default ChatWindow;
