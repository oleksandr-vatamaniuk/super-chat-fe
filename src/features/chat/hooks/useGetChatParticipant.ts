import { useGetChatsQuery } from '@store/chat/chatApi.ts'
import { useGetUserByIdQuery } from '@store/user/userApi.ts'
import useIsOffline from '@hooks/useIsOffline.ts'

const useGetChatParticipant = (chatId: string) => {
	const isOffline = useIsOffline()

	const { chatItem, isLoading: isChatsLoading } = useGetChatsQuery(undefined, {
		selectFromResult: ({ data, isLoading }) => ({
			chatItem: data?.find((item: any) => item.participant._id === chatId),
			isLoading,
		}),
	})

	const {
		data: user,
		isError: isUserError,
		isLoading: isUserLoading,
		isSuccess: isUserSuccess,
	} = useGetUserByIdQuery(chatId, {
		skip: isOffline || !!chatItem,
	})

	const isSuccess = !!chatItem || isUserSuccess

	const userData = chatItem?.participant || user || null

	const isLoading = isChatsLoading || isUserLoading

	const isError = isUserError || (isOffline && !userData)

	return { data: userData, isLoading, isError, isSuccess }
}

export default useGetChatParticipant
