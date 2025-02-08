import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@store/store.ts'
import { User } from '@features/user/userSlice.ts'

type ChatState = {
	currentChatParticipant: User | null
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
		setCurrentParticipant: (state, action) => {
			state.currentChatParticipant = action.payload
		},
		setOnlineUsers: (state, action) => {
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
