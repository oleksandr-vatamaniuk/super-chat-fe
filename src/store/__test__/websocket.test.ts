import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { io } from 'socket.io-client'
import WebSocket from '@store/websocket.ts'

vi.mock('socket.io-client', () => ({
	io: vi.fn(() => ({
		on: vi.fn(),
		off: vi.fn(),
		connect: vi.fn(),
		disconnect: vi.fn(),
		connected: false,
	})),
}))

describe('WebSocketService', () => {
	let mockSocket: WebSocket

	beforeEach(() => {
		mockSocket = io()
		vi.spyOn(localStorage, 'getItem').mockReturnValue('mock-token')
	})

	afterEach(() => {
		WebSocket.disconnect()
		vi.restoreAllMocks()
	})

	it('should disconnect the instance', () => {
		const socket = WebSocket.getInstance()
		WebSocket.disconnect()
		expect(socket.disconnect).toHaveBeenCalled()
	})

	it('should reconnect when back online', () => {
		const socket = WebSocket.getInstance()
		;(mockSocket as any).connected = false
		window.dispatchEvent(new Event('online'))
		expect(socket.connect).toHaveBeenCalled()
	})

	it('should disconnect when going offline', () => {
		const socket = WebSocket.getInstance()
		window.dispatchEvent(new Event('offline'))
		expect(socket.disconnect).toHaveBeenCalled()
	})
})
