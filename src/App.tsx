import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Toaster } from '@components/chakra/toaster.tsx'
import { ForgotPassword, Login, ResetPassword, SignUp, ThankYou, VerifyEmail } from '@features/auth/pages'
import { Chat, ChatList, ChatWindow } from '@features/chat/pages'
import { ChangeAvatar, ChangePassword, EditProfile } from '@features/user/pages'
import { TermsAndPolicy, Error } from '@pages'
import { MainLayout, SettingsLayout } from '@features/user/layouts'
import { AnonymousRoutes, ProtectedRoutes, RestrictGoogleUsers } from '@guards'
import AuthLayout from '@features/auth/layouts/AuthLayout/AuthLayout.tsx'

function App() {
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	})

	return (
		<>
			<Toaster />
			<Routes>
				<Route element={<AuthLayout />}>
					<Route element={<AnonymousRoutes />}>
						<Route
							path='login'
							element={<Login />}
						/>
						<Route
							path='signup'
							element={<SignUp />}
						/>
						<Route
							path='verify'
							element={<VerifyEmail />}
						/>
						<Route
							path='forgot-password'
							element={<ForgotPassword />}
						/>
						<Route
							path='reset-password'
							element={<ResetPassword />}
						/>
						<Route
							path='thankYou'
							element={<ThankYou />}
						/>
					</Route>
					<Route
						path='404'
						element={<Error />}
					/>
				</Route>
				<Route element={<ProtectedRoutes />}>
					<Route element={<MainLayout />}>
						<Route
							index
							element={
								<Navigate
									to='/chat'
									replace
								/>
							}
						/>
						<Route
							path='chat'
							element={isMobile ? <Outlet /> : <Chat />}
						>
							{isMobile && (
								<Route
									index
									element={<ChatList />}
								/>
							)}
							<Route
								path={':chatId'}
								element={<ChatWindow />}
							/>
						</Route>
						<Route
							path='settings'
							element={<SettingsLayout />}
						>
							<Route
								index
								element={
									<Navigate
										to='/settings/edit-profile'
										replace
									/>
								}
							/>
							<Route
								path={'edit-profile'}
								element={<EditProfile />}
							/>
							<Route
								path={'change-avatar'}
								element={<ChangeAvatar />}
							/>
							<Route element={<RestrictGoogleUsers />}>
								<Route
									path={'change-password'}
									element={<ChangePassword />}
								/>
							</Route>
						</Route>
					</Route>
				</Route>
				<Route
					path='privacyPolicy'
					element={<TermsAndPolicy />}
				/>
				<Route
					path='*'
					element={
						<Navigate
							to='/404'
							replace
						/>
					}
				/>
			</Routes>
		</>
	)
}

export default App
