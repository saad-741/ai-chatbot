function MessageInput({ input, setInput, sendMessage, loading }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      className="
        bg-transparent
        px-4
        pb-6
        pt-0
        w-full
      "
    >
      <div
        className="
          max-w-3xl
          mx-auto
          flex
          items-end
          gap-2
          bg-[#0d0d12]
          border
          border-slate-800/60
          focus-within:border-slate-700
          focus-within:ring-1
          focus-within:ring-slate-700/30
          rounded-[26px]
          p-2
          pl-4
          transition-all
          duration-200
          shadow-2xl
        "
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          disabled={loading}
          placeholder="Message AI Assistant..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="
            flex-1
            max-h-52
            resize-none
            bg-transparent
            text-slate-100
            placeholder-slate-500
            py-2.5
            pr-2
            outline-none
            text-sm
            leading-relaxed
            disabled:opacity-50
          "
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="
            h-9
            w-9
            shrink-0
            rounded-full
            bg-white
            hover:bg-slate-200
            disabled:bg-slate-800/40
            text-black
            disabled:text-slate-600
            flex
            items-center
            justify-center
            transition-all
            duration-200
            active:scale-95
            disabled:scale-100
            disabled:cursor-not-allowed
            mb-0.5
            mr-0.5
            cursor-pointer
          "
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.25"
              />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path 
                fillRule="evenodd" 
                d="M11.47 2.47a.75.75 0 0 1 1.06 0l6.25 6.25a.75.75 0 1 1-1.06 1.06L12 4.06 6.28 9.78a.75.75 0 1 1-1.06-1.06l6.25-6.25ZM12 3a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 12 3Z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </button>
      </div>

      <p
        className="
          text-[11px]
          text-slate-600
          text-center
          mt-2
          font-medium
          tracking-wide
        "
      >
        AI can make mistakes. Check important info.
      </p>
    </form>
  );
}

export default MessageInput;