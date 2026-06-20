import { useState } from 'react' 
// import './App.css'

import { Routes, Route, Navigate } from "react-router-dom" 

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ChatPage from "./pages/ChatPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Navigate to="/login" /> }/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/chat"
              element={
                  <ProtectedRoute>
                      <ChatPage />
                  </ProtectedRoute>
              } />
              
        </Routes>
    )
}

export default App
