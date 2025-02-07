import { io, Socket } from 'socket.io-client'

class WebSocket {
	private static instance: Socket | null = null

	private static baseUrl = import.meta.env.PROD ? 'https://super-chat-node.onrender.com' : 'http://localhost:8000'

	private constructor() {}

	public static getInstance(): Socket {
		if (!WebSocket.instance) {
			WebSocket.instance = io(this.baseUrl, {
				reconnectionDelay: 1000,
				reconnection: true,
				reconnectionAttempts: 5,
				transports: ['polling', 'websocket'],
				agent: false,
				upgrade: true,
				rejectUnauthorized: false,
				extraHeaders: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			})

			window.addEventListener('offline', () => {
				console.log('WebSocket connection closed')
				console.log(WebSocket.instance)
				WebSocket.instance?.disconnect()
			})

			window.addEventListener('online', () => {
				console.log('WebSocket back online')
				if (!WebSocket.instance?.connected) {
					WebSocket.instance?.connect()
				}
			})

			// WebSocket.instance.connect();

			WebSocket.instance.on('connect', () => {
				console.log('connected')
			})

			WebSocket.instance.on('disconnect', () => {
				console.log('disconnect!!')
			})

			WebSocket.instance.on('connect_error', (error) => {
				console.error('WebSocket error!!!!', error)
			})
		}

		return WebSocket.instance
	}

	public static disconnect(): void {
		if (WebSocket.instance) {
			WebSocket.instance.disconnect()
			WebSocket.instance = null
		}
	}
}

export default WebSocket
