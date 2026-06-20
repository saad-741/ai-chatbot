import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            const response = await api.post("token/", {
                username,
                password
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/chat");
        } catch (error) {
            console.error(error);
            setErrorMsg("Invalid username or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 antialiased selection:bg-indigo-500 selection:text-white">
            {/* Background Decorative Glow Elements */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Login Box */}
            <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10">
                
                {/* Header branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl mb-3 shadow-lg shadow-indigo-600/30">
                        🤖
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-sm text-slate-400 mt-1">Log in to continue chatting with your AI assistant</p>
                </div>

                {/* Inline Error Message instead of annoying alert alerts */}
                {errorMsg && (
                    <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
                        {errorMsg}
                    </div>
                )}

                {/* Form fields */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            disabled={isLoading}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 flex items-center justify-center mt-2"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="text-center mt-6">
                    <p className="text-xs text-slate-500">
                        Don't have an account? 
                        
                        <span onClick={() => navigate("/register")} className="text-indigo-400 hover:underline cursor-pointer">Sign up</span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;