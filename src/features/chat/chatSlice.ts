import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@store/store.ts'
import { IUser } from '@types'

type ChatState = {
	currentChatParticipant: IUser | null
	onlineUsers: Array<string>
}

const initialState: ChatState = {
	currentChatParticipant: null,
	onlineUsers: [],
}

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setCurrentParticipant: (state, action: PayloadAction<IUser | null>) => {
			state.currentChatParticipant = action.payload
		},
		setOnlineUsers: (state, action: PayloadAction<string[]>) => {
			state.onlineUsers = action.payload
		},
		resetChatState: () => {
			return initialState
		},
	},
})

export const { setCurrentParticipant, setOnlineUsers, resetChatState } = chatSlice.actions

export const selectCurrentParticipant = (state: RootState) => state.chat.currentChatParticipant!
export const selectOnlineUsers = (state: RootState) => state.chat.onlineUsers!
export const selectIsUserOnline = createSelector(
	[(state: RootState) => state.chat.onlineUsers, (_, userId: string) => userId],
	(onlineUsers, userId) => onlineUsers.includes(userId),
)

export default chatSlice.reducer
