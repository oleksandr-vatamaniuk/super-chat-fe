export type AuthProviders = 'MAIL' | 'GOOGLE' | 'FACEBOOK'

export interface IUser {
	_id: string
	avatar: string
	name: string
	email: string
	updatedAt?: string
	age?: number
	authProvider?: AuthProviders
}

export interface GenericResponse {
	msg: string
}

export type MessageResponse = {
	senderId: string
	receiverId: string
	message: string
	_id: string
	createdAt: string
	readByReceiver?: boolean
	updatedAt?: string
	__v?: number
}

export type ChatItem = {
	_id: string
	unreadMessagesCount: number
	lastMessage: MessageResponse
	participant: IUser
}
