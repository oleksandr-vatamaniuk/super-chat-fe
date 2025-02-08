import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/latin.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from '@components/chakra/provider.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import App from './App.tsx'
import store from '@store/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { registerSW } from 'virtual:pwa-register'

// if ('serviceWorker' in navigator) {
// 	registerSW()
// }

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<Provider forcedTheme='light'>
				<BrowserRouter>
					<GoogleOAuthProvider clientId='548283053939-ffeao4tvireer7grb8497ru1sj7om3ma.apps.googleusercontent.com'>
						<App />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>
		</ReduxProvider>
	</StrictMode>,
)
