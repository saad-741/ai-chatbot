import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        // Basic front-end password confirmation check
        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            // Adjust the endpoint matching your Django registration path (e.g., 'register/' or 'users/')
            await api.post("register/", {
                username,
                email,
                password,
            });

            // Redirect to login page upon successful account creation
            navigate("/login");
        } catch (error) {
            console.error(error);
            // Extracts error message sent from DRF validation if available
            const backendError = error.response?.data?.detail || error.response?.data?.username?.[0];
            setErrorMsg(backendError || "Registration failed. Username or email might be taken.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 antialiased selection:bg-indigo-500 selection:text-white">
            {/* Background Decorative Glow Elements */}
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Register Box */}
            <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10">
                
                {/* Header branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl mb-3 shadow-lg shadow-indigo-600/30">
                        🚀
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
                    <p className="text-sm text-slate-400 mt-1">Join to build and customize your own AI chat assistant</p>
                </div>

                {/* Inline Error Status */}
                {errorMsg && (
                    <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
                        {errorMsg}
                    </div>
                )}

                {/* Form fields */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Pick a unique username"
                            value={username}
                            disabled={isLoading}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            disabled={isLoading}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 flex items-center justify-center mt-4"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                {/* Footer Navigation */}
                <div className="text-center mt-6">
                    <p className="text-xs text-slate-500">
                        Already have an account?{" "}
                        <span 
                            onClick={() => navigate("/login")} 
                            className="text-indigo-400 hover:underline cursor-pointer font-medium"
                        >
                            Log in
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default RegisterPage;