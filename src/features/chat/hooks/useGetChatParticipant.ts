import { useGetChatsQuery } from '@features/chat/chatApi.ts'
import useIsOffline from '@hooks/useIsOffline.ts'
import { useGetUserByIdQuery } from '@features/user/userApi.ts'

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

	const isError = isUserError || (isOffline && !isLoading && !userData)
	console.log(isError)

	return { data: userData, isLoading, isError, isSuccess }
}

export default useGetChatParticipant
