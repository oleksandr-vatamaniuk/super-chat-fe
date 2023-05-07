import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import '@base/App.scss'
import Login from '@pages/Login'
import SignUp from '@pages/SignUp'
import ForgotPassword from '@pages/ForgotPassword'
import ResetPassword from '@pages/ResetPassword'
import TermsAndPolicy from '@pages/TermsAndPolicy'
import Error from '@pages/Error'
import HomeLayout from '@layouts/MainLayout'
import Chat from '@pages/Chat'
import Settings from '@pages/Settings'
import EditProfile from '@pages/Settings/editProfile'
import EditAvatar from '@pages/Settings/editAvatar'
import Index from '@pages/Settings/changePassword'
import ChatWindow from '@pages/Chat/ChatWindow'

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
        <Route element={<HomeLayout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="chat" element={<Chat />}>
            <Route path={':chatId'} element={<ChatWindow />} />
          </Route>
          <Route path={'settings'} element={<Settings />}>
            <Route index element={<Navigate to="/settings/edit-profile" replace />} />
            <Route path={'edit-profile'} element={<EditProfile />} />
            <Route path={'change-avatar'} element={<EditAvatar />} />
            <Route path={'change-password'} element={<Index />} />
          </Route>
        </Route>
        <Route path="404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  )
}

export default App
