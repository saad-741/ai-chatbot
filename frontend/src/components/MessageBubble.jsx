import ReactMarkdown from "react-markdown";

function MessageBubble({ message }) {

    const isUser =
        message.role === "user"

    return (

        <div
            className={`flex mb-6 animate-fade-in ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`
                    max-w-3xl
                    px-5
                    py-3.5
                    rounded-2xl
                    shadow-md
                    transition-all

                    ${
                        isUser
                            ? "bg-indigo-600 text-white rounded-br-none shadow-indigo-600/10"
                            : "bg-slate-800/80 border border-slate-700/40 text-slate-100 rounded-bl-none shadow-slate-950/20"
                    }
                `}
            >

                <div
                    className={`
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    mb-1.5
                    ${
                        isUser 
                            ? "text-indigo-200" 
                            : "text-slate-400"
                    }
                    `}
                >

                    {
                        isUser
                            ? "You"
                            : "AI Assistant"
                    }

                </div>

                {

                    isUser

                    ?

                    <p
                        className="
                        whitespace-pre-wrap
                        text-sm
                        leading-relaxed
                        "
                    >
                        {message.content}
                    </p>

                    :

                    <div
                        className="
                        prose
                        prose-invert
                        max-w-none
                        text-sm
                        leading-relaxed
                        prose-p:leading-relaxed
                        prose-pre:bg-slate-950
                        prose-pre:border
                        prose-pre:border-slate-800
                        prose-code:text-indigo-300
                        prose-code:bg-slate-900
                        prose-code:px-1.5
                        prose-code:py-0.5
                        prose-code:rounded
                        prose-code:before:content-none
                        prose-code:after:content-none
                        prose-headings:text-white
                        prose-headings:font-semibold
                        prose-a:text-indigo-400
                        "
                    >

                        <ReactMarkdown>

                            {message.content}

                        </ReactMarkdown>

                    </div>

                }

            </div>

        </div>

    )

}

export default MessageBubble;