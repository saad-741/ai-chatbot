import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function ChatPage() {
  const navigate = useNavigate();

  // const logout = () => {
  //     localStorage.removeItem("access")
  //     localStorage.removeItem("refresh")
  //     navigate("/login")
  // }

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [refreshSidebar, setRefreshSidebar] = useState(0);

  return (
    <div className="flex h-screen w-screen bg-[#09090b] overflow-hidden text-slate-100 font-sans antialiased relative">
      
      {/* Sidebar Layout Layer */}
      <Sidebar
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        setMessages={setMessages}
        refreshSidebar={refreshSidebar}
      />

      {/* Main Chat Workspace Frame */}
      <ChatWindow
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        messages={messages}
        setMessages={setMessages}
        onConversationCreated={() => setRefreshSidebar((prev) => prev + 1)}
      />

      {/* Premium Positioned Logout Trigger Wrapper */}
      <div className="absolute top-3.5 right-6 z-30">
        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            px-3.5
            py-1.5
            bg-slate-900/60
            hover:bg-rose-600/10
            text-slate-400
            hover:text-rose-400
            border
            border-slate-800/80
            hover:border-rose-500/20
            text-xs
            font-medium
            rounded-xl
            backdrop-blur-md
            shadow-lg
            transition-all
            duration-200
            cursor-pointer
            active:scale-95
          "
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-3.5 h-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </div>

    </div>
  );
}

export default ChatPage;