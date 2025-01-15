import { useGetChatsQuery } from '@store/chat/chatApi.ts'
import { useGetUserByIdQuery } from '@store/user/userApi.ts'

const useGetChatParticipant = (chatId: string) => {
	const { chatItem } = useGetChatsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			chatItem: data?.find((item: any) => item.participant._id === chatId),
		}),
	})

	const {
		data: user,
		isError,
		isLoading,
		isSuccess: isUserSuccess,
	} = useGetUserByIdQuery(chatId, {
		skip: !!chatItem,
	})

	const isSuccess = !!chatItem || isUserSuccess

	const userData = chatItem?.participant || user || null

	return { data: userData, isLoading, isError, isSuccess }
}

export default useGetChatParticipant
