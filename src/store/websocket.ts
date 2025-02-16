import { io, Socket } from 'socket.io-client'

class WebSocket {
	private static instance: Socket | null = null
	private static readonly baseUrl = import.meta.env.PROD
		? 'https://super-chat-node.onrender.com'
		: 'http://localhost:8000'

	constructor() {}

	public static getInstance(): Socket {
		if (!this.instance) {
			this.initializeSocket()
		}
		return this.instance!
	}

	private static initializeSocket(): void {
		this.instance = io(this.baseUrl, {
			reconnectionDelay: 2000,
			reconnection: true,
			reconnectionAttempts: 5,
			transports: ['polling', 'websocket'],
			upgrade: true,
			rejectUnauthorized: false,
			extraHeaders: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		})

		window.addEventListener('offline', this.handleOffline)
		window.addEventListener('online', this.handleOnline)

		this.instance.on('connect', () => console.log('WebSocket connected'))
		this.instance.on('disconnect', () => console.log('WebSocket disconnected'))
		this.instance.on('connect_error', (error) => console.error('WebSocket error', error))
	}

	private static handleOffline = (): void => {
		console.log('WebSocket connection closed')
		this.instance?.disconnect()
	}

	private static handleOnline = (): void => {
		console.log('WebSocket back online')
		if (!this.instance?.connected) {
			this.instance?.connect()
		}
	}

	public static disconnect(): void {
		if (this.instance) {
			this.instance.disconnect()
			this.instance = null
			window.removeEventListener('offline', this.handleOffline)
			window.removeEventListener('online', this.handleOnline)
		}
	}
}

export default WebSocket
