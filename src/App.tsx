import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import TermsAndPolicy from './pages/TermsAndPolicy'
import Error from './pages/Error'
import ChatList from './pages/ChatList'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:resetId" element={<ResetPassword />} />
        <Route path="terms-and-policy" element={<TermsAndPolicy />} />
        <Route path="chat-list" element={<ChatList />} />
        <Route path="404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  )
}

export default App
