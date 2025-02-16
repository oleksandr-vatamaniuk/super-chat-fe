import { Message } from '@features/chat/components'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@features/user/userSlice.ts'
import { IUser, MessageResponse } from '@types'

const Messages: FC<{ messages: MessageResponse[]; participant: IUser }> = ({ messages, participant }) => {
	const { _id: userId, avatar: userAvatar = '' } = useSelector(selectUser!) || {}

	return messages.map(({ _id, message, createdAt, senderId }: any, index: number) => {
		const isFirstMessage = index === 0
		const isLastMessage = index === messages.length - 1

		const showName = isFirstMessage || messages[index - 1]?.senderId !== senderId
		const showAvatar = isLastMessage || messages[index + 1]?.senderId !== senderId

		return (
			<Message
				key={_id}
				id={_id}
				text={message}
				time={createdAt}
				variant={userId === senderId ? 'sender' : 'receiver'}
				name={userId === senderId ? 'You' : participant?.name}
				avatar={userId === senderId ? userAvatar : participant?.avatar}
				showName={showName}
				showAvatar={showAvatar}
			/>
		)
	})
}

export default Messages
