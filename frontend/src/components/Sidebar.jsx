import { useEffect, useState } from "react";
import api from "../api/api";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function Sidebar({
  selectedConversation,
  setSelectedConversation,
  setMessages,
  refreshSidebar,
}) {
  const [conversations, setConversations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  useEffect(() => {
    const closeMenu = () => {
      setMenuOpenId(null);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);
  const newChat = () => {
    setSelectedConversation(null);

    setMessages([]);
  };
  useEffect(() => {
    getConversations();
  }, [refreshSidebar]);

  const getConversations = async () => {
    try {
      const response = await api.get("conversations/");

      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renameConversation = async (id) => {
    if (!editingTitle.trim()) return;

    try {
      const response = await api.patch(`conversations/${id}/`, {
        title: editingTitle,
      });

      setConversations(
        conversations.map((conversation) =>
          conversation.id === id ? response.data : conversation,
        ),
      );

      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConversation = async (id) => {
    try {
      await api.delete(`conversations/${id}/`);

      setConversations(
        conversations.filter((conversation) => conversation.id !== id),
      );

      if (selectedConversation === id) {
        setSelectedConversation(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      w-72
      h-screen
      bg-[#09090b]
      text-slate-200
      flex
      flex-col
      border-r
      border-slate-900
      shadow-2xl
      z-20
    "
    >
      {/* Header */}

      <div className="p-4">
        <button
          onClick={newChat}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2.5
          px-4
          py-3
          rounded-xl
          bg-indigo-600/10
          hover:bg-indigo-600
          text-indigo-400
          hover:text-white
          border
          border-indigo-500/10
          hover:border-transparent
          font-semibold
          text-sm
          transition-all
          duration-200
          shadow-lg
          shadow-indigo-600/5
          group
          cursor-pointer
        "
        >
          <span className="text-base group-hover:scale-110 transition-transform font-bold">＋</span>
          New Chat
        </button>
      </div>

      {/* Conversations List */}

      <div
        className="
        flex-1
        overflow-y-auto
        px-3
        space-y-1
        scrollbar-thin
        scrollbar-thumb-slate-900
      "
      >
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`
            group
            flex
            items-center
            justify-between
            px-3
            py-3
            rounded-xl
            cursor-pointer
            transition-all
            duration-150
            border
            ${
              selectedConversation === conversation.id
                ? "bg-slate-900/90 border-slate-800 text-white shadow-md shadow-black/20"
                : "bg-transparent border-transparent hover:bg-slate-900/40 hover:border-slate-900/60 text-slate-400 hover:text-slate-200"
            }
          `}
          >
            <div className="flex-1 min-w-0 pr-2">
              {editingId === conversation.id ? (
                <input
                  value={editingTitle}
                  autoFocus
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onClick={(e) => e.stopPropagation()} 
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameConversation(conversation.id);
                    }

                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditingTitle("");
                    }
                  }}
                  className="
                    w-full
                    bg-slate-950
                    text-white
                    px-2.5
                    py-1
                    rounded-lg
                    outline-none
                    border
                    border-indigo-500/40
                    focus:border-indigo-500
                    text-xs
                    font-medium
                  "
                />
              ) : (
                <div
                  onClick={() => setSelectedConversation(conversation.id)}
                  className="
                    truncate
                    text-sm
                    font-medium
                    py-0.5
                  "
                >
                  {conversation.title}
                </div>
              )}
            </div>

            {/* Actions Menu */}

            <div className="relative flex items-center shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  setMenuOpenId(
                    menuOpenId === conversation.id ? null : conversation.id,
                  );
                }}
                className={`
                  p-1.5
                  rounded-lg
                  transition-all
                  duration-150
                  cursor-pointer
                  ${
                    menuOpenId === conversation.id
                      ? "opacity-100 bg-slate-800 text-white"
                      : "opacity-0 group-hover:opacity-100 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }
                `}
              >
                <HiOutlineDotsHorizontal size={15} />
              </button>

              {menuOpenId === conversation.id && (
                <div
                  onClick={(e) => e.stopPropagation()} 
                  className="
                    absolute
                    right-0
                    top-7
                    w-36
                    bg-slate-900/95
                    backdrop-blur-md
                    border
                    border-slate-800
                    rounded-xl
                    shadow-xl
                    shadow-black/40
                    z-50
                    overflow-hidden
                    p-1
                    animate-in
                    fade-in
                    slide-in-from-top-1
                    duration-100
                  "
                >
                  <button
                    onClick={() => {
                      setEditingId(conversation.id);

                      setEditingTitle(conversation.title);

                      setMenuOpenId(null);
                    }}
                    className="
                      w-full
                      text-left
                      px-3
                      py-2
                      text-xs
                      font-medium
                      rounded-lg
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                      transition-colors
                      cursor-pointer
                    "
                  >
                    Rename
                  </button>

                  <button
                    onClick={() => {
                      deleteConversation(conversation.id);

                      setMenuOpenId(null);
                    }}
                    className="
                      w-full
                      text-left
                      px-3
                      py-2
                      text-xs
                      font-medium
                      rounded-lg
                      text-rose-400
                      hover:bg-rose-600/10
                      hover:text-rose-300
                      transition-colors
                      cursor-pointer
                    "
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User Info Footer Section */}

      <div
        className="
        border-t
        border-slate-900
        p-4
        bg-slate-950/20
      "
      >
        <div
          className="
          flex
          items-center
          gap-3
          text-sm
        "
        >
          <div
            className="
            w-8
            h-8
            rounded-xl
            bg-indigo-600
            text-white
            font-bold
            text-xs
            flex
            items-center
            justify-center
            shadow-md
            shadow-indigo-600/10
          "
          >
            S
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-slate-200 leading-none mb-0.5">Saad</span>
            <span className="text-[10px] text-slate-500 font-medium">Free Member Tier</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;