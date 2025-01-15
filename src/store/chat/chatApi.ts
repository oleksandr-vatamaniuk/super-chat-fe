import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@store/customFetchBase.ts'
import { nanoid } from '@reduxjs/toolkit'
import WebSocket from '@store/websocket.ts'
import { RootState } from '@store/store.ts'
import { setOnlineUsers } from '@store/chat/chatSlice.ts'
import { toaster } from '@components/chakra/toaster.tsx'

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: customFetchBase,
	tagTypes: ['Chats'],
	endpoints: (builder) => ({
		getMessages: builder.query({
			query(id) {
				return {
					url: `/message/${id}`,
				}
			},
		}),
		findMessages: builder.mutation({
			query(searchText) {
				return {
					method: 'POST',
					url: '/message/find-messages',
					credentials: 'include',
					body: {
						searchText,
					},
				}
			},
		}),
		getChats: builder.query({
			query() {
				return {
					url: `/chat`,
				}
			},
			providesTags: ['Chats'],
		}),
		deleteChat: builder.mutation({
			query(participantId: string) {
				console.log(participantId)
				return {
					method: 'DELETE',
					url: `/chat/${participantId}`,
					credentials: 'include',
				}
			},
			invalidatesTags: ['Chats'],
			async onQueryStarted(_args, { dispatch, queryFulfilled }) {
				dispatch(chatApi.util.upsertQueryData('getMessages', _args, []))

				try {
					await queryFulfilled
				} catch (error) {
					console.error(error)
				}
			},
		}),
		sendMessage: builder.mutation({
			query({ receiverId, message }) {
				return {
					method: 'POST',
					url: `/message/send/${receiverId}`,
					credentials: 'include',
					body: {
						message,
					},
				}
			},
			async onQueryStarted({ receiverId, message }, { dispatch, queryFulfilled, getState }) {
				const user = (getState() as RootState).user.user!
				const currentChatParticipant = (getState() as RootState).chat.currentChatParticipant

				const newMessage = {
					_id: nanoid(8),
					senderId: user._id,
					receiverId,
					message,
					createdAt: new Date().toISOString(),
				}

				const patchUpdateChatList = dispatch(
					chatApi.util.updateQueryData('getChats', undefined, (draft) => {
						const conversation = draft.find((c: any) => {
							return c.participant._id === receiverId
						})

						if (conversation) {
							conversation.lastMessage = { ...newMessage }
						} else {
							draft.push({
								_id: nanoid(8),
								unreadMessagesCount: 0,
								participant: { ...currentChatParticipant },
								lastMessage: { ...newMessage },
							})
						}
					}),
				)

				const patchChatMessages = dispatch(
					chatApi.util.updateQueryData('getMessages', receiverId, (draft) => {
						draft.push({ ...newMessage })
					}),
				)

				try {
					await queryFulfilled
				} catch (error) {
					patchUpdateChatList.undo()
					patchChatMessages.undo()
					console.log(error)
				}
			},
		}),
		markAsReadMessages: builder.mutation({
			queryFn({ chatId }) {
				const socket = WebSocket.getInstance()
				return new Promise((resolve, reject) => {
					socket.emit('markAsRead', chatId, (response: any) => {
						response.error ? reject(response) : resolve(response)
					})
				})
			},
			async onQueryStarted({ chatId }, { dispatch, queryFulfilled }) {
				const patchUnreadMessageCount = dispatch(
					chatApi.util.updateQueryData('getChats', undefined, (draft) => {
						const conversation = draft.find((c: any) => {
							return c.participant._id === chatId
						})

						if (conversation) {
							conversation.unreadMessagesCount = 0
						}
					}),
				)

				const patchMessagesToGetRead = dispatch(
					chatApi.util.updateQueryData('getMessages', chatId, (draft) => {
						draft
							.filter((message: any) => message.receiverId !== chatId && !message.readByReceiver)
							.forEach((message: any) => (message.readByReceiver = true))
					}),
				)

				try {
					await queryFulfilled
				} catch (error) {
					console.log(error)
					patchUnreadMessageCount.undo()
					patchMessagesToGetRead.undo()
				}
			},
		}),
		websocketConnect: builder.query({
			queryFn: () => ({ data: { isWebsocketConnected: false } }),
			async onCacheEntryAdded(_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch, getState }) {
				const socket = WebSocket.getInstance()

				await cacheDataLoaded

				socket.on('onlineUsers', (onlineUsers) => {
					console.log('onlineUsers', onlineUsers)
					dispatch(setOnlineUsers(onlineUsers))

					updateCachedData((draft) => {
						draft.isWebsocketConnected = true
					})
				})

				socket.on(`newMessage`, (message) => {
					const currentChatParticipant = (getState() as RootState).chat.currentChatParticipant
					// const sound = new Audio(notificationSound)
					// sound.play()

					const participantId = message.senderId

					dispatch(
						chatApi.util.updateQueryData('getMessages', participantId, (draft) => {
							draft.push(message)
						}),
					)

					dispatch(
						chatApi.util.updateQueryData('getChats', undefined, (draft) => {
							const conversation = draft.find((c: any) => c.participant._id === message.senderId)

							const isCurrentChat = currentChatParticipant && currentChatParticipant?._id === message.senderId

							if (conversation) {
								conversation.lastMessage = { ...message }

								if (!isCurrentChat) {
									conversation.unreadMessagesCount++
								}
							} else {
								dispatch(chatApi.util.invalidateTags(['Chats']))
							}
						}),
					)
				})

				socket.on('deleteChat', ({ participant }) => {
					dispatch(chatApi.util.upsertQueryData('getMessages', participant._id, []))
					dispatch(chatApi.util.invalidateTags(['Chats']))

					toaster.create({
						description: `${participant.name} deleted chat with you`,
						type: 'warning',
					})
				})

				await cacheEntryRemoved
				console.log('WebSocket close ')
				WebSocket.disconnect()
				updateCachedData((draft) => {
					draft.isWebsocketConnected = false
				})
			},
		}),
	}),
})

export const {
	useGetMessagesQuery,
	useGetChatsQuery,
	useSendMessageMutation,
	useFindMessagesMutation,
	useWebsocketConnectQuery,
	useMarkAsReadMessagesMutation,
	useDeleteChatMutation,
} = chatApi
